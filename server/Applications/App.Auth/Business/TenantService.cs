using App.Auth.DTO;
using Azure.Core;
using DAL.Contexts;
using DAL.Models.Tenant;
using Dapper;
using Helper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net.WebSockets;

namespace App.Auth.Business
{
    public class TenantService : ITenantService
    {
        private readonly IConfiguration _configuration;
        private readonly TenantDbContext _tenantDbContext;
        public TenantService(IConfiguration configuration, TenantDbContext tenantDbContext)
        {
            _configuration = configuration;
            _tenantDbContext = tenantDbContext;
        }

        public async Task<DataPagingResult<Tenant>> Paging(TenantRequest request)
        {
            var result = new DataPagingResult<Tenant>();
            var sql = "USP_Get_UserPaging";
            var connString = _configuration.GetConnectionString("Default");
            using (var connection = new SqlConnection(connString))
            {
                var offset = (request.PageIndex - 1) * request.PageSize;
                var fetch = request.PageSize;
                var parameters = new DynamicParameters();
                parameters.Add("@_startDate", request.StartDate, DbType.String);
                parameters.Add("@_endDate", request.EndDate, DbType.String);
                parameters.Add("@_search", request.Search, DbType.String);
                parameters.Add("@_status", request.Status, DbType.Int32);
                parameters.Add("@_sortExpr", request.SortExpr, DbType.String);
                parameters.Add("@_sortDir", request.SortDir, DbType.String);
                parameters.Add("@_offset", offset, DbType.Int32);
                parameters.Add("@_fetch", fetch, DbType.Int32);
                parameters.Add("@_totalRows", null, dbType: DbType.Int32, direction: ParameterDirection.Output);

                var data = await connection.QueryAsync<Tenant>(sql, parameters, commandType: CommandType.StoredProcedure);
                var totalRows = parameters.Get<int>("@_totalRows");
                result.Data = data.ToList();
                result.TotalRows = totalRows;
            }
            return result;
        }

        public async Task<ResultBase<Tenant>> Add(Tenant entity)
        {
            await _tenantDbContext.AddAsync(entity);
            await _tenantDbContext.SaveChangesAsync();
            return new ResultBase<Tenant>
            {
                Code = "00",
                Message = "Success",
                Data = entity
            };
        }

        public async Task<ResultBase<Tenant>> Update(Tenant entity)
        {
            var tenant = await _tenantDbContext.Tenants.FindAsync(entity.Id);
            if (tenant != null)
            {
                _tenantDbContext.Update(entity);
                await _tenantDbContext.SaveChangesAsync();
                return new ResultBase<Tenant>
                {
                    Code = "00",
                    Message = "Success",
                    Data = entity
                };
            }
            else
            {
                return new ResultBase<Tenant>
                {
                    Code = "07",
                    Message = "Not found Item"
                };
            }

        }


        public async Task<ResultBase<Tenant>> Detail(long id)
        {
            var tenant = await _tenantDbContext.Tenants.FirstOrDefaultAsync(x => x.Id == id);
            return new ResultBase<Tenant>
            {
                Code = "00",
                Message = "Success",
                Data = tenant
            };
        }
    }

    public interface ITenantService
    {
        Task<DataPagingResult<Tenant>> Paging(TenantRequest request);
        Task<ResultBase<Tenant>> Add(Tenant entity);
        Task<ResultBase<Tenant>> Update(Tenant entity);
        Task<ResultBase<Tenant>> Detail(long id);
    }
}

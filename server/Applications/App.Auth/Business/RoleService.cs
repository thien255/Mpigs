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
    public class RoleService : IRoleService
    {
        private readonly IConfiguration _configuration;
        private readonly TenantDbContext _tenantDbContext;
        public RoleService(IConfiguration configuration, TenantDbContext tenantDbContext)
        {
            _configuration = configuration;
            _tenantDbContext = tenantDbContext;
        }

        public async Task<DataPagingResult<Role>> Paging(RoleRequest request)
        {
            var result = new DataPagingResult<Role>();
            var sql = "USP_Get_RolePaging";
            var connString = _configuration.GetConnectionString("Default");
            using (var connection = new SqlConnection(connString))
            {
                var offset = (request.PageIndex - 1) * request.PageSize;
                var fetch = request.PageSize;
                var parameters = new DynamicParameters();
                parameters.Add("@_search", request.Search, DbType.String);
                parameters.Add("@_sortDir", request.SortDir, DbType.String);
                parameters.Add("@_sortExpr", request.SortExpr, DbType.String);
                parameters.Add("@_offset", offset, DbType.Int32);
                parameters.Add("@_fetch", fetch, DbType.Int32);
                parameters.Add("@_totalRows", null, dbType: DbType.Int32, direction: ParameterDirection.Output);

                var data = await connection.QueryAsync<Role>(sql, parameters, commandType: CommandType.StoredProcedure);
                var totalRows = parameters.Get<int>("@_totalRows");
                result.Data = data.ToList();
                result.TotalRows = totalRows;
            }
            return result;
        }

        public async Task<ResultBase<Role>> Add(Role entity)
        {
            await _tenantDbContext.AddAsync(entity);
            await _tenantDbContext.SaveChangesAsync();
            return new ResultBase<Role>
            {
                Code = "00",
                Message = "Success",
                Data = entity
            };
        }

        public async Task<ResultBase<Role>> Update(Role entity)
        {
            var tenant = await _tenantDbContext.Roles.FindAsync(entity.Key);
            if (tenant != null)
            {
                _tenantDbContext.Update(entity);
                await _tenantDbContext.SaveChangesAsync();
                return new ResultBase<Role>
                {
                    Code = "00",
                    Message = "Success",
                    Data = entity
                };
            }
            else
            {
                return new ResultBase<Role>
                {
                    Code = "07",
                    Message = "Not found Item"
                };
            }

        }

        public async Task<ResultBase<Role>> Detail(string role)
        {
            var tenant = await _tenantDbContext.Roles.FirstOrDefaultAsync(x => x.Key == role);
            return new ResultBase<Role>
            {
                Code = "00",
                Message = "Success",
                Data = tenant
            };
        }
    }

    public interface IRoleService
    {
        Task<DataPagingResult<Role>> Paging(RoleRequest request);
        Task<ResultBase<Role>> Add(Role entity);
        Task<ResultBase<Role>> Update(Role entity);
        Task<ResultBase<Role>> Detail(string role);
    }
}

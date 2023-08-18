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
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly TenantDbContext _tenantDbContext;
        public UserService(IConfiguration configuration, TenantDbContext tenantDbContext)
        {
            _configuration = configuration;
            _tenantDbContext = tenantDbContext;
        }

        public async Task<DataPagingResult<UserViewModel>> UsersPaging(UserManageRequest request)
        {
            var result = new DataPagingResult<UserViewModel>();
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
                parameters.Add("@_sortExp", request.SortExpr, DbType.String);
                parameters.Add("@_sortDir", request.SortDir, DbType.String);
                parameters.Add("@_offset", offset, DbType.Int32);
                parameters.Add("@_fetch", fetch, DbType.Int32);
                parameters.Add("@_totalRows", null, dbType: DbType.Int32, direction: ParameterDirection.Output);

                var data = await connection.QueryAsync<UserViewModel>(sql, parameters, commandType: CommandType.StoredProcedure);
                var totalRows = parameters.Get<int>("@_totalRows");
                result.Data = data.ToList();
                result.TotalRows = totalRows;
            }
            return result;
        }

        public async Task<ResultBase<User>> Add(User entity)
        {
            await _tenantDbContext.AddAsync(entity);
            await _tenantDbContext.SaveChangesAsync();
            return new ResultBase<User>
            {
                Code = "00",
                Message = "Success",
                Data = entity
            };
        }

        public async Task<ResultBase<User>> Update(User entity)
        {
            var tenant = await _tenantDbContext.Users.FindAsync(entity.Id);
            if (tenant != null)
            {
                _tenantDbContext.Update(entity);
                await _tenantDbContext.SaveChangesAsync();
                return new ResultBase<User>
                {
                    Code = "00",
                    Message = "Success",
                    Data = entity
                };
            }
            else
            {
                return new ResultBase<User>
                {
                    Code = "07",
                    Message = "Not found Item"
                };
            }

        }

        private async Task<User?> FindById(long id)
        {
            return await _tenantDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        private async Task<List<Role>> UserRole(long id)
        {
            var sql = "USP_Get_UserRole";
            var connString = _configuration.GetConnectionString("Default");
            using (var connection = new SqlConnection(connString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@_userId", id, DbType.Int64);

                var data = await connection.QueryAsync<Role>(sql, parameters, commandType: CommandType.StoredProcedure);
                return data.ToList();
            }
        }

        private async Task<List<Tenant>> UserTenant(long id)
        {

            var sql = "USP_Get_UserTenant";
            var connString = _configuration.GetConnectionString("Default");
            using (var connection = new SqlConnection(connString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@_userId", id, DbType.Int64);

                var data = await connection.QueryAsync<Tenant>(sql, parameters, commandType: CommandType.StoredProcedure);
                return data.ToList();
            }
        }

        public async Task<UserDetailViewModel> UserDetail(long id)
        {
            var user = FindById(id);
            var role = UserRole(id);
            var tenants = UserTenant(id);
            var task = new List<Task>()
            {
               user, role, tenants
            };
            await Task.WhenAll(task);
            return new UserDetailViewModel
            {
                User = user.Result,
                Roles = role.Result,
                Tenants = tenants.Result
            };
        }

        public async Task<ResultBase<User>> User(string username)
        {
            var user = await _tenantDbContext.Users.FirstOrDefaultAsync(x => x.UserName.Equals(username));
            await _tenantDbContext.SaveChangesAsync();
            return new ResultBase<User>
            {
                Code = "00",
                Message = "Success",
                Data = user
            };
        }

        public async Task<ResultBase<User>> Delete(UserDeleteRequest entity, string userLogin)
        {
            var user = await _tenantDbContext.Users.FirstOrDefaultAsync(x => x.Id == entity.UserId && x.UserName == entity.Username);
            if (user != null)
            {
                user.IsDelete = true;
                user.LatestUpdatedOn = DateTime.Now;
                user.LatestUpdatedBy = userLogin;
                await _tenantDbContext.SaveChangesAsync();
                return new ResultBase<User>
                {
                    Code = "00",
                    Message = "Success",
                    Data = user
                };
            }

            return new ResultBase<User>
            {
                Code = "400",
                Message = "BadRequest",
            };
        }
    }

    public interface IUserService
    {
        Task<DataPagingResult<UserViewModel>> UsersPaging(UserManageRequest request);
        Task<ResultBase<User>> Add(User entity);
        Task<ResultBase<User>> Update(User entity);
        Task<UserDetailViewModel> UserDetail(long id);
        Task<ResultBase<User>> User(string username);
        Task<ResultBase<User>> Delete(UserDeleteRequest entity, string userLogin);
    }
}

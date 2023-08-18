//using DAL.Contexts;
//using DAL.Models.Tenant;
//using Infrastructure.Data;

//namespace App.Host.Service
//{
//    public class TenantService : ITenantService
//    {
//        private ILogger<TenantService> _logger;
//        private readonly TenantDbContext _tenantContext;
//        public TenantService(ILogger<TenantService> logger, TenantDbContext tenantContext)
//        {
//            _logger = logger;
//            _tenantContext = tenantContext;
//        }

//        public async Task<bool> AddTenant(Tenant entity, TenantUser entityUser)
//        {
//            var transaction = _tenantContext.Database.BeginTransaction();
//            try
//            {
//                await _tenantContext.Tenants.AddAsync(entity);
//                entityUser.TenantId = entity.Id;
//                await _tenantContext.TenantUsers.AddAsync(entityUser);

//                _tenantContext.SaveChanges();
//                transaction.Commit();
//                return true;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError("AddTenant", ex);
//                await transaction.RollbackAsync();
//                return false;
//            }

//        }
//    }

//    public interface ITenantService
//    {
//        public Task<bool> AddTenant(Tenant entity, TenantUser entityUser);
//    }
//}

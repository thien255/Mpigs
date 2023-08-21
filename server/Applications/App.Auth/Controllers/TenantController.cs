using App.Auth.Business;
using App.Auth.DTO;
using DAL.Models.Tenant;
using Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Auth.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TenantController : ControllerBase
    {
        private readonly ILogger<TenantController> _logger;
        private readonly ITenantService _tenantService;


        public TenantController(ILogger<TenantController> logger, ITenantService tenantService)
        {
            _logger = logger;
            _tenantService = tenantService;
        }

        // GET: Tenant/Manage
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<DataPagingResult<Tenant>> Manage(TenantRequest entity)
        { 
           return await _tenantService.Paging(entity); 
        }


        // GET: Tenant/Add
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ResultBase<Tenant>> Add([FromBody] TenantForm entity)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var username = HttpContext.User.Identity?.Name;
                    var tenant = new Tenant()
                    {
                        Code = entity.Code,
                        Name = entity.Name,
                        ShortName = entity.ShortName,
                        Description = entity.Description,
                        Logo = entity.Logo,
                        Phone = entity.Phone,
                        Representative = entity.Representative,
                        IsActive = entity.IsActive,
                        Expired = entity.Expired,
                        Type = entity.Type,
                        Scale = entity.Scale,
                        Address = entity.Address,
                        Email = entity.Email,
                        CreatedBy = username
                    };
                    return await _tenantService.Add(tenant);
                }
                var message = string.Join(", ", ModelState.Values
                 .SelectMany(v => v.Errors)
                 .Select(e => e.ErrorMessage));

                return new ResultBase<Tenant>()
                {
                    Code = "400",
                    Message = "BadRequest",
                    DataMessage = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError("Tenant/Add", ex);
                return new ResultBase<Tenant>()
                {
                    Code = "500",
                    Message = "Internal Error",
                };
            }
        }


        // GET: Tenant/Edit
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ResultBase<Tenant>> Edit([FromBody] TenantForm entity)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var username = HttpContext.User.Identity?.Name;
                    var tenant = new Tenant()
                    {
                        Id = entity.Id,
                        Code = entity.Code,
                        Name = entity.Name,
                        ShortName = entity.ShortName,
                        Description = entity.Description,
                        Logo = entity.Logo,
                        Phone = entity.Phone,
                        Representative = entity.Representative,
                        IsActive = entity.IsActive,
                        Expired = entity.Expired,
                        Type = entity.Type,
                        Scale = entity.Scale,
                        Address = entity.Address,
                        Email = entity.Email,
                        LatestUpdatedOn = DateTime.UtcNow,
                        UpdatedBy = username

                    };
                    return await _tenantService.Update(tenant);
                }
                var message = string.Join(", ", ModelState.Values
                 .SelectMany(v => v.Errors)
                 .Select(e => e.ErrorMessage));

                return new ResultBase<Tenant>()
                {
                    Code = "400",
                    Message = "BadRequest",
                    DataMessage = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError("Tenant/Edit", ex);
                return new ResultBase<Tenant>()
                {
                    Code = "500",
                    Message = "Internal Error",
                };
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Delete()
        {
            return Ok();
        }
    }
}
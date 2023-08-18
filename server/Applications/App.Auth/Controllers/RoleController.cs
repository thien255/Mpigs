using App.Auth.Business;
using App.Auth.DTO;
using Microsoft.AspNetCore.Mvc;

namespace App.Auth.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService) { 
        
        }
        [HttpPost]
        public async Task<IActionResult> Paging([FromBody] RoleRequest request)
        {
            var result = await _roleService.Paging(request);
            return Ok(result);
        }
    }
}

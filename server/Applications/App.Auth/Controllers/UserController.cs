using App.Auth.Business;
using App.Auth.DTO;
using DAL.Models.Tenant;
using Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static IdentityServer4.Models.IdentityResources;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace App.Auth.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        // POST: User/Manage

        [HttpPost]
        public async Task<DataPagingResult<UserViewModel>> Manage([FromBody] UserManageRequest entity)
        {
            try
            {
                var data = await _userService.UsersPaging(entity);
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError("UserController/Manage", ex);
                return new DataPagingResult<UserViewModel>
                {
                    Code = "09",
                    Message = ex.Message,
                    Data = new List<UserViewModel>(),
                    TotalRows = 0,
                };
            }
        }

        [HttpPost]
        public async Task<ResultBase<User>> Add([FromBody] UserForm entity)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var username = HttpContext.User.Identity?.Name;
                    var user = new User()
                    {
                        Email = entity.Email,
                        FullName = entity.FirstName + " " + entity.LastName,
                        FistName = entity.FirstName,
                        LastName = entity.LastName,
                        UserName = entity.UserName,
                        PhoneNumber = entity.PhoneNumber,
                        Password = entity.Password,
                        CreatedBy = username,
                    };
                    return await _userService.Add(user);
                }
                var message = string.Join(", ", ModelState.Values
                 .SelectMany(v => v.Errors)
                 .Select(e => e.ErrorMessage));

                return new ResultBase<User>()
                {
                    Code = "400",
                    Message = "BadRequest",
                    DataMessage = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError("User/Add", ex);
                return new ResultBase<User>()
                {
                    Code = "500",
                    Message = "Internal Error",
                };
            }
        }

        [HttpPost]
        public async Task<ResultBase<User>> Edit([FromBody] UserForm entity)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var username = HttpContext.User.Identity?.Name;
                    var userResult = await _userService.User(entity.UserName);
                    if (userResult.Data == null)
                    {
                        return userResult;
                    };
                    var user = userResult.Data;
                    user.Email = entity.Email;
                    user.FullName = entity.FirstName + " " + entity.LastName;
                    user.FistName = entity.FirstName;
                    user.LastName = entity.LastName;
                    user.UserName = entity.UserName;
                    user.PhoneNumber = entity.PhoneNumber;
                    user.Password = entity.Password;
                    user.CreatedBy = username;
                    return await _userService.Add(user);
                }
                var message = string.Join(", ", ModelState.Values
                 .SelectMany(v => v.Errors)
                 .Select(e => e.ErrorMessage));

                return new ResultBase<User>()
                {
                    Code = "400",
                    Message = "BadRequest",
                    DataMessage = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError("User/Add", ex);
                return new ResultBase<User>()
                {
                    Code = "500",
                    Message = "Internal Error",
                };
            }
        }

        [HttpPost]
        public async Task<ResultBase<UserDetailViewModel>> GetUserDetail(long userId)
        {
            try
            {
                var user = await _userService.UserDetail(userId);
                return new ResultBase<UserDetailViewModel>
                {
                    Code = "00",
                    Message = "Success",
                    Data = user
                };
            }
            catch (Exception ex)
            {
                _logger.LogError("UserController/Add", ex);
                return new ResultBase<UserDetailViewModel>
                {
                    Code = "09",
                    Message = ex.Message
                };
            }
        }

        [HttpPost]
        public async Task<ResultBase<User>> Delete([FromBody] UserDeleteRequest entity)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var username = HttpContext.User.Identity?.Name;
                    return await _userService.Delete(entity, username);
                }
                var message = string.Join(", ", ModelState.Values
                 .SelectMany(v => v.Errors)
                 .Select(e => e.ErrorMessage));

                return new ResultBase<User>()
                {
                    Code = "400",
                    Message = "BadRequest",
                    DataMessage = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError("User/Add", ex);
                return new ResultBase<User>()
                {
                    Code = "500",
                    Message = "Internal Error",
                };
            }
        }

    }
}

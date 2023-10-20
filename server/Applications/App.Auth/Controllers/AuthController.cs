using App.Auth.Business;
using App.Auth.DTO;
using DAL.Models.Tenant;
using Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace App.Auth.Controllers
{
    [ApiController]
    //[Route("[controller]/[action]")]

    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;

        public AuthController(ILogger<AuthController> logger, IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }


        // POST: auth/login

        [HttpPost]
        public async Task<IActionResult> Sign([FromBody] SignForm user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.UserName))
                {
                    return BadRequest(new { message = "Email address needs to entered" });
                }
                else if (string.IsNullOrEmpty(user.Password))
                {
                    return BadRequest(new { message = "Password needs to entered" });
                }

                SignRespon? loggedInUser = await _authService.SignAsync(user.UserName, user.Password);

                if (loggedInUser != null)
                {

                    return Ok(loggedInUser);
                }

                return BadRequest(new { message = "User login unsuccessful" });
            }
            catch (Exception ex)
            {
                _logger.LogError("/Auth/Sign", ex);
                return BadRequest();
            }

        }


        // POST: auth/register 
        [HttpPost]
        public async Task<ResultBase<string>> Register([FromBody] RegisterUser user)
        {
            if (string.IsNullOrEmpty(user.UserName))
            {

                return new ResultBase<string>()
                {
                    Code = HttpStatusCode.BadRequest.ToString(),
                    Message = "User name needs to entered"
                };
            }
            else if (string.IsNullOrEmpty(user.Password))
            {
                return new ResultBase<string>()
                {
                    Code = HttpStatusCode.BadRequest.ToString(),
                    Message = "Password needs to entered"
                };
            }

            User userToRegister = new User()
            {
                UserName = user.UserName,
                FullName = user.UserName,
                Password = user.Password,
            };

            return await _authService.Register(userToRegister);

        }


        // POST: auth/refreshToken
        [HttpPost]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            try
            {
                if (tokenModel is null)
                {
                    return BadRequest("Invalid client request");
                }

                string? accessToken = tokenModel.AccessToken ?? "";
                string? refreshToken = tokenModel.RefreshToken ?? "";
                var refreshTokenRespon = await _authService.RefreshToken(accessToken, refreshToken);
                if (refreshTokenRespon != null)
                {
                    return Ok(refreshTokenRespon);
                }

                return BadRequest("Invalid client request");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "RefreshToken");
                return BadRequest("Invalid client request");
            }
        }


        // GET: auth/test

        [HttpGet]
        [Authorize(Roles = "Admin,Tenant")]
        public IActionResult Test()
        {
            string token = Request.Headers["Authorization"].ToString() ?? "";

            if (token.StartsWith("Bearer"))
            {
                token = token.Substring("Bearer ".Length).Trim();
            }
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwt = handler.ReadJwtToken(token);

            var claims = new Dictionary<string, string>();

            foreach (var claim in jwt.Claims)
            {
                claims.Add(claim.Type, claim.Value);
            }

            return Ok(claims);
        }



    }
}
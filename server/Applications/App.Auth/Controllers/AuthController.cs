using App.Auth.Business;
using App.Auth.DTO;
using DAL.Models.Tenant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace App.Auth.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;
        private readonly SignInManager<User> _signInManager;

        public AuthController(ILogger<AuthController> logger, IAuthService authService, SignInManager<User> signInManager,
            UserManager<User> userManager)
        {
            _logger = logger;
            _authService = authService;
            _signInManager = signInManager;
        }


        // POST: auth/login
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Sign([FromBody] SignForm user)
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


        // POST: auth/register
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser user)
        {
            if (string.IsNullOrEmpty(user.Name))
            {
                return BadRequest(new { message = "Name needs to entered" });
            }
            else if (string.IsNullOrEmpty(user.UserName))
            {
                return BadRequest(new { message = "User name needs to entered" });
            }
            else if (string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Password needs to entered" });
            }

            DAL.Models.Tenant.User userToRegister = new DAL.Models.Tenant.User()
            {
                UserName = user.UserName,
                FullName = user.UserName,
                Password = user.Password,
            };

            DAL.Models.Tenant.User registeredUser = await _authService.Register(userToRegister);

            SignRespon? loggedInUser = await _authService.SignAsync(registeredUser.UserName ?? "", user.Password ?? "");

            if (loggedInUser != null)
            {
                return Ok(loggedInUser);
            }

            return BadRequest(new { message = "User registration unsuccessful" });
        }


        // POST: auth/refreshToken
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }

            string? accessToken = tokenModel.AccessToken ?? "";
            string? refreshToken = tokenModel.RefreshToken ?? "";
            var refreshTokenRespon = await _authService.RefreshToken(accessToken, refreshToken);
            return Ok(refreshTokenRespon);

        }


        // GET: auth/test
        [Authorize(Roles = "Everyone")]
        [HttpGet]
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
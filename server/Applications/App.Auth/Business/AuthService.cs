
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace App.Auth.Business
{
    using App.Auth.DTO;
    using App.Auth.Helper;
    using BCrypt.Net;
    using DAL.Contexts;
    using DAL.Models.Tenant;
    using global::Helper;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using System;
    using System.Security.Cryptography;

    public class AuthService : IAuthService
    {

        private readonly TenantDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public AuthService(TenantDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<SignRespon?> SignAsync(string email, string password)
        {
            DAL.Models.Tenant.User? user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == email);

            if (user == null || BCrypt.Verify(password, user.Password) == false)
            {
                return null; //returning null intentionally to show that login was unsuccessful
            }

            List<UserRole> roles = await _dbContext.UserRoles.Where(x => x.UserId == user.Id).ToListAsync();
            var claims = new List<Claim>() {
                new Claim(ClaimTypes.Name, user.FullName ?? ""),
                new Claim(ClaimTypes.Email, string.IsNullOrEmpty(user.Email) ? "" : user.Email),
                new Claim(ClaimTypes.GivenName, string.IsNullOrEmpty(user.UserName) ? "" : user.UserName)
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Role));
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var jwtSecurityToken = CreateJwtSecurityToken(claims);
            var refreshToken = GenerateRefreshToken();
            var accessToken = tokenHandler.WriteToken(jwtSecurityToken);

            var result = new SignRespon
            {
                Id = user.UserName,
                Name = user.FullName,
                Email = user.UserName,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Role = roles.Select(x => x.Role).ToList(),
                Expiration = jwtSecurityToken.ValidTo,
                AccessTokenExpires = ((DateTimeOffset)jwtSecurityToken.ValidTo).ToUnixTimeSeconds()
            };

            _ = AddLog(new Logged
            {
                UserName = user.UserName,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.Now.AddDays(_configuration.GetValue<int>("JWT:RefreshTokenValidityInDays")),
                ExpTime = jwtSecurityToken.ValidTo
            });
            return result;
        }

        public async Task<ResultBase<string>> Register(User user)
        {
            var checkExist = await _dbContext.Users.AnyAsync(u => u.UserName == user.UserName);
            if (!checkExist)
            {
                user.Password = BCrypt.HashPassword(user.Password).ToString();
                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();
                return new ResultBase<string>
                {
                    Code = "00",
                    Message = "Success"
                };
            }

            return new ResultBase<string>
            {
                Code = "400",
                Message = "Đã tồn tại tài khoản trên hệ thống"
            };
        }

        public async Task<TokenModel?> RefreshToken(string accessToken, string refreshToken)
        {
            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return null;
            }

            string username = principal.Identity?.Name ?? "";

            var signLog = await _dbContext.Loggeds.FirstOrDefaultAsync(x => x.UserName == username && x.AccessToken == accessToken && x.RefreshToken == refreshToken);

            if (signLog == null || signLog.RefreshToken != refreshToken || signLog.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return null;
            }

            var jwtSecurityToken = CreateJwtSecurityToken(principal.Claims.ToList());
            var tokenHandler = new JwtSecurityTokenHandler();
            var newAccessToken = tokenHandler.WriteToken(jwtSecurityToken);
            var newRefreshToken = GenerateRefreshToken();
            signLog.RefreshToken = newRefreshToken;
            signLog.AccessToken = newAccessToken;
            _dbContext.Loggeds.Update(signLog);
            await _dbContext.SaveChangesAsync();
            return new TokenModel()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }


        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidAudience = _configuration["JWT:Audience"] ?? "",
                ValidateIssuer = true,
                ValidIssuer = _configuration["JWT:Issuer"] ?? "",
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"] ?? "")),
                ValidateLifetime = true
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }

        private async Task AddLog(Logged signLog)
        {
            signLog.CreatedOn = DateTime.Now;
            await _dbContext.Loggeds.AddAsync(signLog);
            await _dbContext.SaveChangesAsync();
        }
        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
        private JwtSecurityToken CreateJwtSecurityToken(List<Claim> claim)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"] ?? ""));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
               issuer: _configuration["JWT:Issuer"],
               audience: _configuration["JWT:Audience"],
               expires: DateTime.Now.Add(TimeSpan.FromMinutes(_configuration.GetValue<int>("JWT:TokenValidityInMinutes"))),
               claims: claim,
               signingCredentials: creds
            );
        }

    }


}

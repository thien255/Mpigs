
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace App.Auth.Business
{
    using App.Auth.DTO;
    using BCrypt.Net;
    using DAL.Contexts;
    using DAL.Models.Tenant;
    using Microsoft.EntityFrameworkCore;
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


            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"] ?? "");
            ClaimsIdentity claimsIdentity = new ClaimsIdentity();
            DateTimeOffset expired = new DateTimeOffset(DateTime.UtcNow.AddMinutes(30));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.FullName ?? ""),
                    new Claim(ClaimTypes.Email, string.IsNullOrEmpty(user.Email) ? "" : user.Email),
                    new Claim(ClaimTypes.GivenName, string.IsNullOrEmpty(user.UserName) ? "" : user.UserName),
                    new Claim(ClaimTypes.Expired,expired.ToUnixTimeSeconds().ToString())
                }),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            foreach (var role in roles)
            {
                tokenDescriptor.AdditionalHeaderClaims.Add(role.Role, role.Role);
            }


            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = GenerateRefreshToken();
            var accessToken = tokenHandler.WriteToken(token);
            var result = new SignRespon
            {
                Id = user.UserName,
                Name = user.FullName,
                Email = user.UserName,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Expiration = token.ValidTo,
                AccessTokenExpires = ((DateTimeOffset)token.ValidTo).ToUnixTimeSeconds()
            };
            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshtokenValidityInDays);
            _ = AddLog(new Logged
            {
                UserName = user.UserName,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshtokenValidityInDays),
                ExpTime = expired.UtcDateTime
            });
            return result;
        }

        public async Task<User> Register(User user)
        {
            user.Password = BCrypt.HashPassword(user.Password).ToString();
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return user;
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

            var newAccessToken = CreateToken(principal.Claims.ToList());
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
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"] ?? "")),
                ValidateLifetime = false
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
        private string CreateToken(List<Claim> claim)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"] ?? "");
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var claimIdentity = new ClaimsIdentity(claim);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimIdentity,
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(token);
            return accessToken;
        }

    }


}

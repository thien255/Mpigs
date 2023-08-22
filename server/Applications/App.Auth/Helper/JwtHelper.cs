using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace App.Auth.Helper
{
    public class JwtHelper
    {
        public static JwtSecurityToken GetJwtToken(
        string signingKey,
        string issuer,
        string audience,
        TimeSpan expiration,
        List<Claim> additionalClaims = null)
        {  
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.Now.Add(expiration),
                claims: additionalClaims,
                signingCredentials: creds
            );
        }
    }
}

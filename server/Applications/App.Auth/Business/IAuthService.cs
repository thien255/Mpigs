using App.Auth.DTO;
using DAL.Models.Tenant;
using Helper;

namespace App.Auth.Business
{
    public interface IAuthService
    {
        public Task<SignRespon?> SignAsync(string email, string password); 
        public Task<ResultBase<string>> Register(User user);
        public Task<TokenModel?> RefreshToken(string accessToken, string refreshToken); 
    }



}

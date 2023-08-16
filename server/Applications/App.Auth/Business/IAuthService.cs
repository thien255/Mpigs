﻿using App.Auth.DTO;
using App.Auth.Models;

namespace App.Auth.Business
{
    public interface IAuthService
    {
        public Task<SignRespon?> SignAsync(string email, string password); 
        public Task<User> Register(User user);
        public Task<TokenModel?> RefreshToken(string accessToken, string refreshToken); 
    }



}

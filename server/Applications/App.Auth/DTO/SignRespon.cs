namespace App.Auth.DTO
{
    public class SignRespon
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? AccessToken { get; set; }
        public DateTime? Expiration { get; set; }
        public long AccessTokenExpires { get; set; }
        
        public string? RefreshToken { get; set; }
        public List<string> Role { get; set; } = new List<string>();
        public string? Avatar { get; set; } 
    }
}

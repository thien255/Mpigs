using System.ComponentModel.DataAnnotations;

namespace App.Auth.DTO
{
    public class UserDeleteRequest
    {
        [Required]
        public long UserId { get; set; }
        [Required]
        public string Username { get; set; } = string.Empty;
    }
}

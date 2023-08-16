using System.ComponentModel.DataAnnotations;

namespace App.Auth.Models
{
    public class SignLog
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string? UserName { get; set; }

        [Required]
        public string? AccessToken { get; set; }

        public DateTime ExpTime { get; set; }

        [Required]
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public DateTime LoginTime { get; set; } = DateTime.Now;
       
        [StringLength(450)]
        public string? DeviceId { get; set; }
    }
}

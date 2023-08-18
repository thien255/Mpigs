using System.ComponentModel.DataAnnotations;

namespace App.Auth.DTO
{
    public class UserForm
    {
        [MaxLength(60)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string UserName { get; set; } = string.Empty;
        [Required]
        [MaxLength(30)]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [MaxLength(30)]
        public string FirstName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;
    }
}


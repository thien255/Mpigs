using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Auth.Models
{
    public class UserRole
    {
        [Key]
        public long? Id { get; set; }

        [Required]
        public long? UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string? RoleId { get; set; }
    }
}

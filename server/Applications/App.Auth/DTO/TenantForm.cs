using System.ComponentModel.DataAnnotations;

namespace App.Auth.DTO
{
    public class TenantForm
    {
        public long Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; } = null!;

        [Required]
        [MaxLength(60)]
        public string ShortName { get; set; } = null!;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = null!;

        [MaxLength(250)]
        public string? Logo { get; set; }

        [MaxLength(250)]
        public string? Address { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(60)]
        public string? Representative { get; set; }
         

        public DateTime? Expired { get; set; }

        [MaxLength(60)]
        public string? Email { get; set; }

        [MaxLength(250)]
        public string? Scale { get; set; }

        public bool? IsActive { get; set; } 
    }
}

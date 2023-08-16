using System.ComponentModel.DataAnnotations;

namespace App.Auth.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? UserName { get; set; }

        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(20)]
        public string? FistName { get; set; }

        [StringLength(20)]
        public string? LastName { get; set; }

        [Required] 
        public string? Password { get; set; }

     
        [StringLength(50)]
        public string? Email { get; set; }
 
        [StringLength(16)]
        public string? Phone { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime? Updated { get; set; }
        public bool IsActive { get; set; }
    }

   
}

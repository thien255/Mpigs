using System.ComponentModel.DataAnnotations;

namespace App.Auth.Models
{
    public class Role
    { 
        [Key]
        [StringLength(50)]
        public string? Code { get; set; } 
    }
}

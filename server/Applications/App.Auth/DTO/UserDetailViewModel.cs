using DAL.Models.Tenant;

namespace App.Auth.DTO
{
    public class UserDetailViewModel
    {
        public User User { get; set; }
        public List<Role> Roles { get; set; }
        public List<Tenant> Tenants { get; set; }
    }
}

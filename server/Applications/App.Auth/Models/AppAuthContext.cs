using Microsoft.EntityFrameworkCore;

namespace App.Auth.Models
{
    public class AppAuthContext : DbContext
    {
        public AppAuthContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<SignLog> SignLogs { get; set; }
    }
}

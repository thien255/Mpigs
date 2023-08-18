namespace App.Auth.DTO
{
    public class UserViewModel
    {
        public long Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Tenant { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string CreateBy { get; set; } = string.Empty;
        public string CreatedOn { get; set; } = string.Empty;
    }
}

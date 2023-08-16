namespace App.Auth.DTO
{
    public class SignForm
    {
        public string UserName { get; set; } = "";
        public string Password { get; set; } = ""; 
    }
    
    public class RegisterUser
    {
        public string Name { get; set; } = "";
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public string Role { get; set; } = "Everyone";
    }
}

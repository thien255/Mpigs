namespace App.Auth.DTO
{
    public class RoleRequest
    {
        public string Search { get; set; } = string.Empty;
        public string SortDir { get; set; } = string.Empty;
        public string SortExpr { get; set; } = string.Empty;
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}

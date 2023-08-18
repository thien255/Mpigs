namespace App.Auth.DTO
{
    public class TenantRequest
    {
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string Search { get; set; } = string.Empty; 
        public int Status { get; set; }
        public string SortDir { get; set; } = string.Empty;
        public string SortExpr { get; set; } = string.Empty;
        public int PageSize { get; set; }
        public int PageIndex { get; set; }

    }
}


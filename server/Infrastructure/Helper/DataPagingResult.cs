namespace Helper
{
    public class DataPagingResult<T>
    {
        public string Message { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public List<T> Data { get; set; }
        public int TotalRows { get; set; }

    }
}
namespace Helper
{
    public class ResultBase<T>
    {
        public string Code { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }

        public string DataMessage { get; set; } = string.Empty;
    }
}

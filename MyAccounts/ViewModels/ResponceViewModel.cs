namespace MyAccounts.ViewModels
{
    public class ResponceViewModel<T>
    {
        public ResponceViewModel(string message)
        {
            HasError = true;
            ErrorMessage = message;
        }
        public ResponceViewModel(T data)
        {
            Data = data;
        }

        public bool HasError { get; set; }
        public string ErrorMessage { get; set; }
        public T Data { get; set; }

        public static ResponceViewModel<string> GenerateError(string message)
        {
            return new ResponceViewModel<string>(message);
        }

        public static ResponceViewModel<T> GenerateRepsonce(T data)
        {
            return new ResponceViewModel<T>(data);
        }
    }
}

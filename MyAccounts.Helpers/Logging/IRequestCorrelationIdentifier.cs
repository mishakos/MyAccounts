namespace MyAccounts.Helpers.Logging
{
    public interface IRequestCorrelationIdentifier
    {
        string CorrelationID { get; }
    }
}

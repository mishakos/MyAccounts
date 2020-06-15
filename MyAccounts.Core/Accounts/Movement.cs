using MyAccounts.Helpers.Domain;

namespace MyAccounts.Core.Accounts
{
    public class Movement : IAggregateRoot
    {
        public int Id { get; set; }
        public int EconomicOperationId { get; set; }
        public virtual EconomicOperation EconomicOperation { get; set; }
        public int DebetAccountId { get; set; }
        public virtual Account DebetAccount { get; set; }
        public int KreditAccountId { get; set; }
        public virtual Account KreditAccount { get; set; }

        public decimal? QuantityDt { get; set; }
        public decimal? QuantityKt { get; set; }
        public decimal AmountDt { get; set; }
        public decimal AmountKt { get; set; }

    }
}

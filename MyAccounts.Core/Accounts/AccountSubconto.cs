using MyAccounts.Helpers.Domain;

namespace MyAccounts.Core.Accounts
{
    public class AccountSubconto : IAggregateRoot
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }
        public int SubcontoTypeId { get; set; }
        public SubcontoType SubcontoType { get; set; }
        public int SubcontoValue { get; set; }

    }
}

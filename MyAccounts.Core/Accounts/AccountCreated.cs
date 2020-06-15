using MyAccounts.Helpers.Domain;

namespace MyAccounts.Core.Accounts
{
    public class AccountCreated : DomainEvent
    {
        public Account Account { get; set; }

        public override void Flatten()
        {
            this.Args.Add(nameof(Account.Id), Account.Id);
            this.Args.Add(nameof(Account.Code), Account.Code);
            this.Args.Add(nameof(Account.ParentId), Account.ParentId);
        }
    }
}

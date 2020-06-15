using MyAccounts.Helpers.Domain;

namespace MyAccounts.Core.Accounts
{
    public class SubcontoType : IAggregateRoot
    {
        public int Id { get; set; }
        public string Name { get; set; }


    }
}
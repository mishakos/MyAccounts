using MyAccounts.Core.Banks;
using MyAccounts.Core.Clients;
using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Domain;

using System;

namespace MyAccounts.Core.BankAccounts
{
    public class BankAccount : IAggregateRoot
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string AccountNumber { get; set; }
        public int BankId { get; set; }
        public virtual Bank Bank { get; set; }
        public int OwnerId { get; set; }
        public virtual Client Owner { get; set; }
        public bool IsForiegnCurrency { get; set; }
        public int CurrencyId { get; set; }
        public virtual Currency Currency { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? CloseDate { get; set; }
        public string AccountType { get; set; }
        public string PaymentDescription { get; set; }

    }
}

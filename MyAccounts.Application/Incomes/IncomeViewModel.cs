using MyAccounts.Application.Clients;
using MyAccounts.Application.Currencies;

using System;

namespace MyAccounts.Application.Incomes
{
    public class IncomeViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int ClientId { get; set; }
        public virtual ClientViewModel Client { get; set; }

        public int CurrencyId { get; set; }
        public CurrencyViewModel Currency { get; set; }
        public decimal Amount { get; set; }

    }
}

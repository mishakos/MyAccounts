using MyAccounts.Core.Clients;
using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Domain;
using MyAccounts.Helpers.Exceptions;

using System;

namespace MyAccounts.Core.Incomes
{
    public class Income : IAggregateRoot
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        public int CurrencyId { get; set; }
        public virtual Currency Currency { get; set; }
        public decimal Amount { get; set; }
        public static Income Create(DateTime date, int clientId, decimal amount, int currencyId)
        {
            if (clientId == 0)
            {
                throw new ValidationException("Client is not selected.");
            }
            if (currencyId == 0)
            {
                throw new ValidationException("Currency is not selected.");
            }
            var sale = new Income
            {
                ClientId = clientId,
                Amount = amount,
                CurrencyId = currencyId,
                Date = date
            };

            return sale;
        }
    }
}

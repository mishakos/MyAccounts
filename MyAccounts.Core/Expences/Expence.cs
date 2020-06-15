using MyAccounts.Core.Clients;
using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Domain;
using MyAccounts.Helpers.Exceptions;
using System;

namespace MyAccounts.Core.Expences
{
    public class Expence : IAggregateRoot
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int ClientId { get; set; }

        public virtual Client Client { get; set; }

        public int CurrencyId { get; set; }

        public Currency Currency { get; set; }

        public decimal Amount { get; set; }

        public static Expence Create(int clientId, decimal amount, int currencyId)
        {
            if (clientId == 0)
            {
                throw new ValidationException("Client is not selected.");
            }
            if (currencyId == 0)
            {
                throw new ValidationException("Currency is not selected.");
            }
            var expence = new Expence
            {
                ClientId = clientId,
                CurrencyId = currencyId,
                Amount = amount
            };

            return expence;
        }
    }
}

using MyAccounts.Helpers.Domain;
using MyAccounts.Helpers.Exceptions;

using System;

namespace MyAccounts.Core.Currencies
{
    public class CurrencyRate : IAggregateRoot
    {
        public int Id { get; set; }
        public int CurrencyId { get; set; }

        public virtual Currency Currency  { get; set; }
        public DateTime Date { get; set; }
        public int Koef { get; set; }
        public decimal Rate { get; set; }

        public static CurrencyRate CreateRate(int currencyId, DateTime date, int koef, decimal rate)
        {
            if (currencyId == 0)
            {
                throw new ValidationException("Currency Id cannot be null.");
            }
            if (koef <= 0)
            {
                throw new ValidationException($"Koef have to be more than 0");
            }
            if (rate <= 0)
            {
                throw new ValidationException("Rate have to be more than 0");
            }

            var curRate = new CurrencyRate
            {
                Date = date,
                CurrencyId = currencyId,
                Koef = koef,
                Rate = rate
            };

            return curRate;
        }

    }
}

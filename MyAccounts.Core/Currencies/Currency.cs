using MyAccounts.Helpers.Domain;
using MyAccounts.Helpers.Exceptions;

using System.Collections.Generic;

namespace MyAccounts.Core.Currencies
{
    public class Currency : IAggregateRoot
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string ShortCode { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }

        public List<CurrencyRate> Rates  { get; set; }

        public static Currency CreateCurrency(string code, string shortCode, string symbol, string name)
        {
            if (code.Length > 3)
            {
                throw new ValidationException("Currency code has max length 3 symbols.");
            }
            var curr = new Currency
            {
                Code = code,
                ShortCode = shortCode,
                Symbol = symbol,
                Name = name
            };
            return curr;
        }
    }
}

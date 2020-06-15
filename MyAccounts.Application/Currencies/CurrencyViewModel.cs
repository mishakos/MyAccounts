using MyAccounts.Core.Currencies;

namespace MyAccounts.Application.Currencies
{
    public class CurrencyViewModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string ShortCode { get; set; }
        public string Symbol { get; set; }

        public string Name { get; set; }

        public static CurrencyViewModel MapFromData(Currency currency)
        {
            return new CurrencyViewModel()
            {
                Id = currency.Id,
                Code = currency.Code,
                Symbol = currency.Symbol,
                ShortCode = currency.ShortCode,
                Name = currency.Name
            };
        }
    }
}
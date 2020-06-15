using MyAccounts.Core.Currencies;

using System;

namespace MyAccounts.Application.Currencies
{
    public class CurrencyRateViewModel
    {
        public int Id { get; set; }
        public int CurrencyId { get; set; }
        public DateTime Date { get; set; }
        public string CurrencyCode { get; set; }
        public int Koef { get; set; }
        public decimal Rate { get; set; }

        public static CurrencyRateViewModel MapFromData(CurrencyRate rate)
        {
            return new CurrencyRateViewModel()
            {
                Id = rate.Id,
                CurrencyId = rate.CurrencyId,
                CurrencyCode = rate.Currency?.ShortCode,
                Date = rate.Date,
                Koef = rate.Koef,
                Rate = rate.Rate
            };
        }
    }
}
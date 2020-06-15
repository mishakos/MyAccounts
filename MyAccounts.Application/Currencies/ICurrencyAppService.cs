using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Application.Currencies
{
    public interface ICurrencyAppService
    {
        void AddCurrency(CurrencyViewModel currency);
        Task<IEnumerable<CurrencyViewModel>> GetCurrencies();
        CurrencyViewModel GetCurrency(string code);
        CurrencyRateViewModel GetRateByCurrencyAndDateAsync(int code, DateTime date);
        void AddRate(CurrencyRateViewModel rate);
        void UpdateCurrency(CurrencyViewModel model);
        IEnumerable<CurrencyRateViewModel> GetRatesByCurrency(int code);
        Task<IEnumerable<CurrencyRateViewModel>> ImportRatesAsync(int CurrencyId, DateTime fromDate, DateTime toDate);
    }
}
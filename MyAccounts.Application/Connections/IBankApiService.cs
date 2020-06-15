using MyAccounts.Core.Currencies;

using System;
using System.Threading.Tasks;

namespace MyAccounts.Application.Connections
{
    public interface IBankApiService
    {
        Task<CurrencyRate> LoadRate(int currencyId, string currencyCode, DateTime date);
    }
}

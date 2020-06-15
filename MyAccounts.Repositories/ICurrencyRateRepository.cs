using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Repository;

using System.Collections.Generic;

namespace MyAccounts.Repositories
{
    public interface ICurrencyRateRepository : IRepository<CurrencyRate>
    {
        void AddRange(IEnumerable<CurrencyRate> rates);
    }
}

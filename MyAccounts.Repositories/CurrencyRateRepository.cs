using Microsoft.EntityFrameworkCore;

using MyAccounts.Context;
using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Specification;

using System.Collections.Generic;
using System.Linq;

namespace MyAccounts.Repositories
{
    public class CurrencyRateRepository : Repository<CurrencyRate>, ICurrencyRateRepository
    {
        public CurrencyRateRepository(MyAccountsDbContext context) : base(context)
        {
        }

        public void AddRange(IEnumerable<CurrencyRate> rates)
        {
            context.CurrencyRates.AddRange(rates);
        }

        public override IEnumerable<CurrencyRate> Find(ISpecification<CurrencyRate> spec)
        {
            return context.CurrencyRates
                .Include(p => p.Currency)
                .Where(spec.IsSatisfiedBy)
                .OrderByDescending(p => p.Date)
                .ToList();
        }
    }
}

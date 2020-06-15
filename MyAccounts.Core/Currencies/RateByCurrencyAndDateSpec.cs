using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Currencies
{
    public class RateByCurrencyAndDateSpec : SpecificationBase<CurrencyRate>
    {
        private readonly int currencyId;
        private readonly DateTime date;

        public RateByCurrencyAndDateSpec(int currencyId, DateTime date)
        {
            this.currencyId = currencyId;
            this.date = date;
        }

        public override Expression<Func<CurrencyRate, bool>> SpecExpression => rate => rate.CurrencyId == currencyId && (rate.Date == date || rate.Date < date);
    }
}

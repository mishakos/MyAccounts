using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Currencies
{
    public class RateByCurrencySpec : SpecificationBase<CurrencyRate>
    {
        private readonly int currencyId;
        public RateByCurrencySpec(int currencyId)
        {
            this.currencyId = currencyId;
        }

        public override Expression<Func<CurrencyRate, bool>> SpecExpression => item => item.CurrencyId == currencyId;
    }
}

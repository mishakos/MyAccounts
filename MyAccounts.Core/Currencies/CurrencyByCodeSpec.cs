using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Currencies
{
    public class CurrencyByCodeSpec : SpecificationBase<Currency>
    {

        private readonly string code;
        public CurrencyByCodeSpec(string code)
        {
            this.code = code;
        }

        public override Expression<Func<Currency, bool>> SpecExpression => curr => curr.Code == code;
    }
}

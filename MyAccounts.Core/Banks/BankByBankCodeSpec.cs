using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Banks
{
    public class BankByBankCodeSpec : SpecificationBase<Bank>
    {
        private string code;
        public BankByBankCodeSpec(string code)
        {
            this.code = code;
        }
        public override Expression<Func<Bank, bool>> SpecExpression => p => p.BankCode == code;
    }
}

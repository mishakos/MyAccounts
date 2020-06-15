using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Accounts
{
    public class AccountExistSpec : SpecificationBase<Account>
    {
        private readonly string code;

        public AccountExistSpec(string code)
        {
            this.code = code;
        }

        public override Expression<Func<Account, bool>> SpecExpression => account => account.Code.Trim() == code.Trim();
    }
}

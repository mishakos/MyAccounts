using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Banks
{
    public class CodeLikeSpecification : SpecificationBase<Bank>
    {
        private string code;
        public CodeLikeSpecification(string code)
        {
            this.code = code;
        }

        public override Expression<Func<Bank, bool>> SpecExpression => p => p.BankCode.ToLower().Contains(code.ToLower());
    }
}

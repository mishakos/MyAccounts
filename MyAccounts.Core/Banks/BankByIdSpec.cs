using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Banks
{
    public class BankByIdSpec : SpecificationBase<Bank>
    {
        private int id;
        public BankByIdSpec(int id)
        {
            this.id = id;
        }
        public override Expression<Func<Bank, bool>> SpecExpression => p => p.Id == id;
    }
}

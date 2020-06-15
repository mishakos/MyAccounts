using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Incomes
{
    public class IncomeByPeriodSpec : SpecificationBase<Income>
    {
        private readonly DateTime StartDate;
        private readonly DateTime EndDate;

        public IncomeByPeriodSpec(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }


        public override Expression<Func<Income, bool>> SpecExpression
        {
            get
            {
                return inc => inc.Date >= StartDate && inc.Date <= EndDate;
            }
        }
    }
}

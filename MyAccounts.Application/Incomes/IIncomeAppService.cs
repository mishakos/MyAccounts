using System;
using System.Collections.Generic;

namespace MyAccounts.Application.Incomes
{
    public interface IIncomeAppService
    {
        void AddIncome(IncomeViewModel model);
        List<IncomeViewModel> GetIncomes(DateTime startDate, DateTime endDate);
    }
}
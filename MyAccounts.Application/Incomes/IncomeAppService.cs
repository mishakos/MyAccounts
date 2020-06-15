using AutoMapper;

using MyAccounts.Core.Incomes;
using MyAccounts.Helpers.Repository;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace MyAccounts.Application.Incomes
{
    public class IncomeAppService : IIncomeAppService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Income> repository;
        private readonly IMapper mapper;

        public IncomeAppService(IUnitOfWork unitOfWork, IRepository<Income> repository, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        public List<IncomeViewModel> GetIncomes(DateTime startDate, DateTime endDate)
        {
            if (startDate == null)
            {
                throw new ValidationException("Start date can not be null");
            }
            if (endDate == null)
            {
                throw new ValidationException("End date can not be null");
            }
            var spec = new IncomeByPeriodSpec(startDate, endDate);
            var incomes = repository.FindOrdered(spec, x => x.Date, true).ToList();
            return mapper.Map<List<IncomeViewModel>>(incomes);
        }

        public void AddIncome(IncomeViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("Income can not be null.");
            }
            var income = Income.Create(model.Date, model.ClientId, model.Amount, model.CurrencyId);
            try
            {
                unitOfWork.BeginTransaction();
                repository.Add(income);
                unitOfWork.Commit();

            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
        }
    }
}

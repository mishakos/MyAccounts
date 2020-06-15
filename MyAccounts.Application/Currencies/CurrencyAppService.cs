using MyAccounts.Application.Connections;
using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Repository;
using MyAccounts.Repositories;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAccounts.Application.Currencies
{
    public class CurrencyAppService : ICurrencyAppService
    {
        private readonly ICurrencyRepository currRepository;
        private readonly ICurrencyRateRepository currRateRepository;
        private readonly IBankApiService bankService;
        private readonly IUnitOfWork unitOfWork;

        public CurrencyAppService(
            ICurrencyRepository currRepository,
            ICurrencyRateRepository currRateRepository,
            IBankApiService bankService,
            IUnitOfWork unitOfWork)
        {
            this.currRepository = currRepository;
            this.currRateRepository = currRateRepository;
            this.bankService = bankService;
            this.unitOfWork = unitOfWork;
        }

        public CurrencyRateViewModel GetRateByCurrencyAndDateAsync(int code, DateTime date)
        {
            var spec = new RateByCurrencyAndDateSpec(code, date);
            var rate = currRateRepository.FindOrdered(spec, x => x.Date, true)
                .Select(p => CurrencyRateViewModel.MapFromData(p))
                .FirstOrDefault(); 
            if (rate == null)
            {
                throw new KeyNotFoundException("Rate not found");
            }
            return rate;
        }

        public IEnumerable<CurrencyRateViewModel> GetRatesByCurrency(int code)
        {
            var spec = new RateByCurrencySpec(code);
            var rates = currRateRepository.FindOrdered(spec, x => x.Date, true, 0, 10, x => x.Currency)
                .Select(p => CurrencyRateViewModel.MapFromData(p)).ToList();
            return rates ?? new List<CurrencyRateViewModel>();
        }

        public CurrencyViewModel GetCurrency(string code)
        {
            var spec = new CurrencyByCodeSpec(code);
            var curr = currRepository.FindOne(spec);
            return CurrencyViewModel.MapFromData(curr);
        }

        public void AddCurrency(CurrencyViewModel currency)
        {
            var existCurrSpec = new CurrencyByCodeSpec(currency.Code);
            var oldItem = currRepository.FindOne(existCurrSpec);
            if (oldItem != null)
            {
                throw new ValidationException($"Currency {currency.Code} already exist!");
            }

            var curr = Currency.CreateCurrency(currency.Code, currency.ShortCode, currency.Symbol, currency.Name);
            try
            {
                unitOfWork.BeginTransaction();
                currRepository.Add(curr);
                unitOfWork.Commit();

            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
        }

        public async Task<IEnumerable<CurrencyViewModel>> GetCurrencies()
        {
            var currencies = await currRepository.GetAll();
            return currencies.Select(p => CurrencyViewModel.MapFromData(p));
        }

        public void AddRate(CurrencyRateViewModel rate)
        {
            var currency = currRepository.FindById(rate.CurrencyId);
            if (currency == null)
            {
                throw new ValidationException($"Currency {rate.CurrencyId} not found.");
            }

            var currRate = CurrencyRate.CreateRate(rate.CurrencyId, rate.Date, rate.Koef, rate.Rate);
            try
            {
                unitOfWork.BeginTransaction();
                currRateRepository.Add(currRate);
                unitOfWork.Commit();

            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
        }

        public void UpdateCurrency(CurrencyViewModel model)
        {
            var oldItem = currRepository.FindById(model.Id);
            if (oldItem == null)
            {
                throw new ValidationException($"Currency {model.Id} not found.");
            }
            oldItem.Name = model.Name;
            oldItem.ShortCode = model.ShortCode;
            oldItem.Symbol = model.Symbol;
            oldItem.Code = model.Code;
            try
            {
                unitOfWork.BeginTransaction();
                currRepository.Update(oldItem);
                unitOfWork.Commit();
            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
        }

        public async Task<IEnumerable<CurrencyRateViewModel>> ImportRatesAsync(int CurrencyId, DateTime fromDate, DateTime toDate)
        {
            var result = new List<Task<CurrencyRate>>();
            var currency = currRepository.FindById(CurrencyId);
            var dates = (toDate - fromDate).TotalDays;
            for (var i = 0; i < dates; i++)
            {
                var date = fromDate.AddDays(i);
                var rate = bankService.LoadRate(currency.Id, currency.ShortCode, date);
                result.Add(rate);
            }
            var rates = await Task.WhenAll(result);
            try
            {
                unitOfWork.BeginTransaction();
                currRateRepository.AddRange(rates);
                unitOfWork.Commit();
            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
            return rates.Select(p => CurrencyRateViewModel.MapFromData(p));
        }
    }
}

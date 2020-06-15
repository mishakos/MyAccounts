using MyAccounts.Core.Banks;
using MyAccounts.Helpers.Exceptions;
using MyAccounts.Helpers.Repository;
using MyAccounts.Repositories;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAccounts.Application.Banks
{
    public class BankAppService : IBankAppService
    {
        private readonly IBankRepository bankRepository;
        private readonly IUnitOfWork unitOfWork;

        public BankAppService(IBankRepository bankRepository, IUnitOfWork unitOfWork)
        {
            this.bankRepository = bankRepository;
            this.unitOfWork = unitOfWork;
        }

        public BankViewModel AddBank(BankViewModel model)
        {
            var bankCodeSpec = new BankByBankCodeSpec(model.BankCode);
            var existedBank = bankRepository.FindOne(bankCodeSpec);
            if (existedBank != null)
            {
                throw new ValidationException($"Bank with code {model.BankCode} already exist. Enter another one.");
            }
            var bank = Bank.Create(model.Name, model.IsGroup, model.ParentId, model.BankCode, model.CorrAccount, model.Address, model.Phones, model.City);
            try
            {
                unitOfWork.BeginTransaction();
                bankRepository.Add(bank);
                unitOfWork.Commit();
            }
            catch (System.Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
            return BankViewModel.MapFromData(bank);
        }

        public async Task<IEnumerable<BankViewModel>> GetAll()
        {
            return (await bankRepository.GetAll()).Select(p => BankViewModel.MapFromData(p));
        }

        public IEnumerable<BankViewModel> GetByCode(string code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                throw new ValidationException("Enter code first before find.");
            }
            var codeLikeSpec = new CodeLikeSpecification(code);
            return bankRepository.Find(codeLikeSpec).Select(p => BankViewModel.MapFromData(p)).ToList();
        }

        public BankViewModel GetById(int id)
        {
            if (id == 0)
            {
                throw new ValidationException("Enter value more than zero.");
            }
            var spec = new BankByIdSpec(id);
            return BankViewModel.MapFromData(bankRepository.FindOne(spec));
        }

        public void UpdateBank(BankViewModel model)
        {
            var oldItem = bankRepository.FindById(model.Id);
            if (oldItem == null)
            {
                throw new ValidationException($"Bank {model.Id} not found.");
            }
            oldItem.IsGroup = model.IsGroup;
            oldItem.Name = model.Name;
            oldItem.Address = model.Address;
            oldItem.BankCode = model.BankCode;
            oldItem.City = model.City;
            oldItem.CorrAccount = model.CorrAccount;
            oldItem.ParentId = model.ParentId;
            oldItem.Phones = model.Phones;
            try
            {
                unitOfWork.BeginTransaction();
                bankRepository.Update(oldItem);
                unitOfWork.Commit();
            }
            catch (System.Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
        }

        public void RemoveBank(int id, BankViewModel bank)
        {
            var oldItem = bankRepository.FindById(bank.Id);
            if (oldItem == null)
            {
                throw new ValidationException($"Bank {bank.Id} not found.");
            }

            try
            {
                unitOfWork.BeginTransaction();
                bankRepository.Remove(oldItem);
                unitOfWork.Commit();
            }
            catch (System.Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
        }
    }
}

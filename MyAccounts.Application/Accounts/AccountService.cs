using MyAccounts.Core.Accounts;
using MyAccounts.Helpers.Repository;
using MyAccounts.Helpers.Specification;
using MyAccounts.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAccounts.Application.Accounts
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository accountRepository;
        private readonly IUnitOfWork unitOfWork;

        public AccountService(IAccountRepository accountRepository, IUnitOfWork unitOfWork)
        {
            this.accountRepository = accountRepository;
            this.unitOfWork = unitOfWork;
        }

        public AccountViewModel AddAccount(AccountViewModel account)
        {
            ISpecification<Account> existedAccountSpec = new AccountExistSpec(account.Code);
            var existedAccount = accountRepository.FindOne(existedAccountSpec);
            if (existedAccount != null)
            {
                throw new System.Exception("Account already created!");
            }
            var acc = Account.CreateAccount(account.Code, account.Description, account.ParentId, account.InBalance, account.IsActive, account.IsPassive);
            try
            {
                unitOfWork.BeginTransaction();
                accountRepository.Add(acc);
                unitOfWork.Commit();
                return AccountViewModel.MapFromData(acc);
            }
            catch
            {
                unitOfWork.Rollback();
                throw;
            }
        }

        public void DeleteAccount(int id)
        {
            if (id == 0)
            {
                throw new NullReferenceException("Id can not be null.");
            }
            var oldModel = accountRepository.FindById(id);
            if (oldModel == null)
            {
                throw new KeyNotFoundException("Account not found.");
            }
            try
            {
                unitOfWork.BeginTransaction();
                accountRepository.Remove(oldModel);
                unitOfWork.Commit();
            }
            catch
            {
                unitOfWork.Rollback();
                throw;
            }
        }

        public async Task<IEnumerable<AccountViewModel>> GetAll()
        {
            var accounts = await this.accountRepository.GetAll();
            return accounts.Select(p => AccountViewModel.MapFromData(p)).ToList();
        }

        public AccountViewModel GetById(int id)
        {
            var account = accountRepository.FindById(id);
            return AccountViewModel.MapFromData(account);
        }

        public void UpdateAccount(AccountViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("Account is empty.");
            }
            if (model.Id == 0)
            {
                throw new NullReferenceException("Id can not be null.");
            }
            var oldModel = accountRepository.FindById(model.Id);
            if (oldModel == null)
            {
                throw new KeyNotFoundException("Account not found.");
            }
            oldModel.InBalance = model.InBalance;
            oldModel.IsActive = model.IsActive;
            oldModel.IsPassive = model.IsPassive;
            oldModel.ParentId = model.ParentId;
            oldModel.Code = model.Code;
            oldModel.Description = model.Description;
            try
            {
                unitOfWork.BeginTransaction();
                accountRepository.Update(oldModel);
                unitOfWork.Commit();
            }
            catch
            {
                unitOfWork.Rollback();
                throw;
            }
        }
    }
}

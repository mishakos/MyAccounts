using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Application.Accounts
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountViewModel>> GetAll();

        AccountViewModel AddAccount(AccountViewModel account);
        AccountViewModel GetById(int id);
        void UpdateAccount(AccountViewModel model);
        void DeleteAccount(int id);
    }
}

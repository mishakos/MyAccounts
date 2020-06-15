using MyAccounts.Core.Accounts;
using MyAccounts.Helpers.Repository;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<IEnumerable<Account>> GetAll();
        void Update(Account account);
    }
}

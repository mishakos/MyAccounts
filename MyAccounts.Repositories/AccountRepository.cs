using Microsoft.EntityFrameworkCore;

using MyAccounts.Context;
using MyAccounts.Core.Accounts;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(MyAccountsDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Account>> GetAll()
        {
            return await this.context.Accounts.ToListAsync();
        }

        public void Update(Account account)
        {
            context.Accounts.Update(account);
        }
    }
}

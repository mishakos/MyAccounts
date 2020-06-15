using Microsoft.EntityFrameworkCore;

using MyAccounts.Context;
using MyAccounts.Core.Currencies;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public class CurrencyRepository : Repository<Currency>, ICurrencyRepository
    {
        public CurrencyRepository(MyAccountsDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Currency>> GetAll()
        {
            return await context.Currencies.ToListAsync();
        }

        public void Update(Currency oldItem)
        {
            context.Currencies.Update(oldItem);
        }
    }
}

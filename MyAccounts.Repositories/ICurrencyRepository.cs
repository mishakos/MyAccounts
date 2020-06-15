using MyAccounts.Core.Currencies;
using MyAccounts.Helpers.Repository;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public interface ICurrencyRepository : IRepository<Currency>
    {
        Task<IEnumerable<Currency>> GetAll();
        void Update(Currency oldItem);
    }
}

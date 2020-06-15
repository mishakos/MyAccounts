using Microsoft.EntityFrameworkCore;

using MyAccounts.Context;
using MyAccounts.Core.Clients;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        public ClientRepository(MyAccountsDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Client>> GetClients()
        {
            return await context.Clients.ToListAsync();
        }
    }
}

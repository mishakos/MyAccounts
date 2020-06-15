using MyAccounts.Core.Clients;
using MyAccounts.Helpers.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public interface IClientRepository : IRepository<Client>
    {
        Task<IEnumerable<Client>> GetClients();
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Application.Clients
{
    public interface IClientAppService
    {
        ClientViewModel Add(ClientViewModel client);
        Task<IEnumerable<ClientViewModel>> GetAll();
    }
}
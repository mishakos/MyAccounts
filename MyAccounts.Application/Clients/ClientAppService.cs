using MyAccounts.Core.Banks;
using MyAccounts.Core.Clients;
using MyAccounts.Helpers.Repository;
using MyAccounts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyAccounts.Application.Clients
{
    public class ClientAppService : IClientAppService
    {
        private readonly IClientRepository clientRepository;
        private readonly IUnitOfWork unitOfWork;

        public ClientAppService(IClientRepository clientRepository, IUnitOfWork unitOfWork)
        {
            this.clientRepository = clientRepository;
            this.unitOfWork = unitOfWork;
        }

        public ClientViewModel Add(ClientViewModel client)
        {
            var idSpec = new ClientByIdSpec(client.Id);
            var oldClient = clientRepository.FindById(client.Id);
            if (oldClient != null)
            {
                throw new ArgumentException($"Client with id ({client.Id}) already exist.");
            }

            var newClient = Client.Create(client.Name, client.IsResident, client.Address, client.Phone);
            try
            {
                unitOfWork.BeginTransaction();
                clientRepository.Add(newClient);
                unitOfWork.Commit();
            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }

            client.Id = newClient.Id;
            return client;
        }

        public async Task<IEnumerable<ClientViewModel>> GetAll()
        {
            return (await clientRepository.GetAll()).Select(p => ClientViewModel.FromData(p));
        }
    }
}

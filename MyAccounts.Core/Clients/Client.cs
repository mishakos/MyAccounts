using MyAccounts.Helpers.Domain;

namespace MyAccounts.Core.Clients
{
    public class Client : IAggregateRoot
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool IsResident { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public static Client Create(string name, bool isResident, string address, string phone)
        {
            var newClient = new Client();
            newClient.Name = name;
            newClient.IsResident = isResident;
            newClient.Address = address;
            newClient.Phone = phone;

            return newClient;
        }
    }
}

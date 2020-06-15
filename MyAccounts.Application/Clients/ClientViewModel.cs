using MyAccounts.Core.Clients;

namespace MyAccounts.Application.Clients
{
    public class ClientViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool IsResident { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public static ClientViewModel FromData(Client p)
        {
            return new ClientViewModel()
            {
                Id = p.Id,
                Address = p.Address,
                IsResident = p.IsResident,
                Name = p.Name,
                Phone = p.Phone
            };
        }
    }
}

using MyAccounts.Core.Banks;

namespace MyAccounts.Application.Banks
{
    public class BankViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public string ParentName { get; set; }
        public bool IsGroup { get; set; }
        public string CorrAccount { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phones { get; set; }
        public string BankCode { get; set; }

        public static BankViewModel MapFromData(Bank bank)
        {
            return new BankViewModel
            {
                Id = bank.Id,
                Address = bank.Address,
                BankCode = bank.BankCode,
                City = bank.City,
                CorrAccount = bank.CorrAccount,
                IsGroup = bank.IsGroup,
                Name = bank.Name,
                ParentId = bank.ParentId,
                ParentName = bank.Parent != null ? bank.Parent.Name : string.Empty, 
                Phones = bank.Phones
            };
        }
    }
}
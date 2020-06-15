using MyAccounts.Helpers.Domain;
using System;

namespace MyAccounts.Core.Banks
{
    public class Bank : IAggregateRoot
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public Bank Parent { get; set; }
        public bool IsGroup { get; set; }
        public string CorrAccount { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phones { get; set; }
        public string BankCode { get; set; }

        public static Bank Create(string name, bool isGroup, int? parentId, string bankCode, string corrAccount, string address, string phones, string city)
        {
            var newBank = new Bank()
            {
                Name = name,
                IsGroup = isGroup,
                ParentId = parentId,
                BankCode = bankCode,
                Address = address,
                CorrAccount = corrAccount,
                Phones = phones,
                City = city
            };

            return newBank;
        }
    }
}

using MyAccounts.Helpers.Domain;

using System;
using System.Collections.Generic;

namespace MyAccounts.Core.Accounts
{
    public class Account : IAggregateRoot
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        public int? ParentId { get; set; }
        public virtual Account Parent { get; set; }
        public bool InBalance { get; set; }
        public bool IsActive { get; set; }
        public bool IsPassive { get; set; }


        public virtual ICollection<Account> SubAccounts { get; set; }


        public static Account CreateAccount(string code, string description, int? parentId, bool InBalance, bool IsActive, bool IsPassive)
        {
            if (string.IsNullOrWhiteSpace(code) || string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentNullException("Code or Description");
            }
            var account = new Account
            {
                Code = code,
                Description = description,
                ParentId = parentId,
                IsActive = IsActive,
                InBalance = InBalance,
                IsPassive = IsPassive
            };

            DomainEvents.Raise(new AccountCreated() { Account = account });

            return account;
        }
    }
}

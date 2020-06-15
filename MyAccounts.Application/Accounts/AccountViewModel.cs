using MyAccounts.Core.Accounts;

namespace MyAccounts.Application.Accounts
{
    public class AccountViewModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }
        public string ParentCode { get; set; }
        public bool InBalance { get; set; }
        public bool IsActive { get; set; }
        public bool IsPassive { get; set; }

        public static AccountViewModel MapFromData(Account account)
        {
            return new AccountViewModel()
            {
                Id = account.Id,
                Code = account.Code,
                Description = account.Description,
                InBalance = account.InBalance,
                IsActive = account.IsActive,
                IsPassive = account.IsPassive,
                ParentId = account.ParentId,
                ParentCode = account.Parent?.Code
            };
        }

        public Account MapToData()
        {
            return new Account()
            {
                Id = Id,
                Code = Code,
                Description = Description,
                InBalance = InBalance,
                IsActive = IsActive,
                IsPassive = IsPassive,
                ParentId = ParentId
            };
        }
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccounts.Application.Banks
{
    public interface IBankAppService
    {
        Task<IEnumerable<BankViewModel>> GetAll();
        BankViewModel GetById(int id);
        IEnumerable<BankViewModel> GetByCode(string code);

        BankViewModel AddBank(BankViewModel model);
        void UpdateBank(BankViewModel model);
        void RemoveBank(int id, BankViewModel model);
    }
}

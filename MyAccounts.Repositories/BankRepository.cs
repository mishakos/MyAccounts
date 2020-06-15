using MyAccounts.Context;
using MyAccounts.Core.Banks;

namespace MyAccounts.Repositories
{
    public class BankRepository : Repository<Bank>, IBankRepository
    {
        public BankRepository(MyAccountsDbContext context): base(context)
        {

        }
        public void Update(Bank bank)
        {
            context.Banks.Update(bank);
        }
    }
}

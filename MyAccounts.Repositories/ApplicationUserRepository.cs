using MyAccounts.Context;
using MyAccounts.Core.ApplicationUser;

namespace MyAccounts.Repositories
{
    public class ApplicationUserRepository : Repository<ApplicationUser>
    {
        public ApplicationUserRepository(MyAccountsDbContext context) : base(context)
        {
        }
    }
}

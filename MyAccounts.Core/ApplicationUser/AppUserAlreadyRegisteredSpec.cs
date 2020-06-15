using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.ApplicationUser
{
    public class AppUserAlreadyRegisteredSpec : SpecificationBase<ApplicationUser>
    {
        readonly string userName;
        public AppUserAlreadyRegisteredSpec(string userName)
        {
            this.userName = userName;
        }

        public override Expression<Func<ApplicationUser, bool>> SpecExpression
        {
            get
            {
                return user => user.UserName == userName;
            }
        }
    }
}

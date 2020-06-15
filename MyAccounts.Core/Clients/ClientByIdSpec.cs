using MyAccounts.Helpers.Specification;

using System;
using System.Linq.Expressions;

namespace MyAccounts.Core.Clients
{
    public class ClientByIdSpec : SpecificationBase<Client>
    {
        private int id;
        public ClientByIdSpec(int id)
        {
            this.id = id;
        }
        public override Expression<Func<Client, bool>> SpecExpression => p => p.Id == id;

    }
}

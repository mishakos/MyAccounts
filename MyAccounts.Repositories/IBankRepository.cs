using MyAccounts.Core.Banks;
using MyAccounts.Helpers.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyAccounts.Repositories
{
    public interface IBankRepository : IRepository<Bank>
    {
        void Update(Bank bank);
    }
}

using MyAccounts.Helpers.Domain;

using System;
using System.Collections.Generic;

namespace MyAccounts.Core.Accounts
{
    public class EconomicOperation : IAggregateRoot
    {
        public int Id { get; set; }
        public string DisplayLabel { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<Movement> Movements { get; set; }

    }
}

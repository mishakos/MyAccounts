using System;
using System.Collections.Generic;

namespace MyAccounts.Helpers.Domain
{
    public abstract class DomainEvent
    {
        public string Type { get { return this.GetType().Name; } }
        public DateTime Created { get; private set; }
        public Dictionary<string, Object> Args { get; private set; }
        public string CorrelationID { get; set; }

        protected DomainEvent()
        {
            Created = DateTime.Now;
            Args = new Dictionary<string, Object>();
        }

        public abstract void Flatten();

    }
}

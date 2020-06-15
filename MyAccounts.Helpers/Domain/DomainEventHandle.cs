using MyAccounts.Helpers.Logging;
using MyAccounts.Helpers.Repository;

namespace MyAccounts.Helpers.Domain
{
    public class DomainEventHandle<TDomainEvent> : IHandles<TDomainEvent>
        where TDomainEvent : DomainEvent
    {
        readonly IDomainEventRepository domainEventRepository;
        readonly IRequestCorrelationIdentifier requestCorrelationIdentifier;

        public DomainEventHandle(IDomainEventRepository domainEventRepository,
            IRequestCorrelationIdentifier requestCorrelationIdentifier)
        {
            this.domainEventRepository = domainEventRepository;
            this.requestCorrelationIdentifier = requestCorrelationIdentifier;
        }

        public void Handle(TDomainEvent @event)
        {
            @event.Flatten();
            @event.CorrelationID = this.requestCorrelationIdentifier.CorrelationID;
            domainEventRepository.Add(@event);
        }
    }
}

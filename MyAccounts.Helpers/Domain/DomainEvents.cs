using Autofac;

using System;
using System.Collections.Generic;

namespace MyAccounts.Helpers.Domain
{
    public static class DomainEvents
    {
        [ThreadStatic]
        private static List<Delegate> _actions;

        private static IContainer _services;

        public static void Init(IContainer services)
        {
            _services = services;
        }

        public static void Register<T>(Action<T> callback) where T : DomainEvent
        {
            if (_actions == null)
            {
                _actions = new List<Delegate>();
            }
            _actions.Add(callback);
        }

        public static void ClearCallbacks()
        {
            _actions = null;
        }

        public static void Raise<T>(T args) where T : DomainEvent
        {
            if (_services != null)
            {
                foreach (var handler in _services.Resolve<IEnumerable<IHandles<T>>>())
                {
                    handler.Handle(args);
                }
                if (_actions != null)
                {
                    foreach (var action in _actions)
                    {
                        if (action is Action<T>)
                        {
                            ((Action<T>)action)(args);
                        }
                    }
                }
            }
        }
    }
}

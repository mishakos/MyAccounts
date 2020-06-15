using MyAccounts.Helpers.Domain;
using MyAccounts.Helpers.Specification;

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyAccounts.Helpers.Repository
{
    public interface IRepository<TEntity>
        where TEntity : IAggregateRoot
    {
        TEntity FindById(int id);
        TEntity FindOne(ISpecification<TEntity> spec);
        IEnumerable<TEntity> Find(ISpecification<TEntity> spec);
        IEnumerable<TEntity> FindOrdered(ISpecification<TEntity> spec, Func<TEntity, object> orderBy, bool isDescending, int skip = 0, int take = 10, params Expression<Func<TEntity, object>>[] include );
        void Add(TEntity entity);
        void Remove(TEntity entity);
        Task<IEnumerable<TEntity>> GetAll();
    }
}

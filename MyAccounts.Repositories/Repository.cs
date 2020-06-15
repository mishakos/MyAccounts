using Microsoft.EntityFrameworkCore;

using MyAccounts.Context;
using MyAccounts.Helpers.Domain;
using MyAccounts.Helpers.Repository;
using MyAccounts.Helpers.Specification;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyAccounts.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IAggregateRoot
    {
        protected readonly MyAccountsDbContext context;

        public Repository(MyAccountsDbContext context)
        {
            this.context = context;
        }

        public virtual TEntity FindById(int id)
        {
            return context.Set<TEntity>().Where(x => x.Id == id).FirstOrDefault();
        }

        public virtual TEntity FindOne(ISpecification<TEntity> spec)
        {
            return context.Set<TEntity>().Where(spec.IsSatisfiedBy).FirstOrDefault();
        }

        public virtual IEnumerable<TEntity> Find(ISpecification<TEntity> spec)
        {
            return context.Set<TEntity>().AsQueryable<TEntity>().Where(spec.IsSatisfiedBy);
        }
        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            return await context.Set<TEntity>().AsQueryable<TEntity>().ToListAsync();
        }

        public virtual void Add(TEntity entity)
        {
            context.Set<TEntity>().Add(entity);
        }

        public virtual void Remove(TEntity entity)
        {
            context.Set<TEntity>().Remove(entity);
        }

        public virtual IEnumerable<TEntity> FindOrdered(ISpecification<TEntity> spec, Func<TEntity, object> orderBy = null, bool isDescending = false, int skip = 0, int take = 10, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = context.Set<TEntity>().AsQueryable<TEntity>();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            if (orderBy == null)
            {
                orderBy = x => x.Id;
            }
            if (isDescending)
            {
                return query.Where(spec.IsSatisfiedBy).OrderByDescending(orderBy).Skip(skip).Take(take);
            }
            return query.Where(spec.IsSatisfiedBy).OrderBy(orderBy).Skip(skip).Take(take);
        }

    }
}

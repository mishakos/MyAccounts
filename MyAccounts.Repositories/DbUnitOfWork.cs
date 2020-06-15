using Microsoft.EntityFrameworkCore.Storage;

using MyAccounts.Helpers.Repository;

namespace MyAccounts.Repositories
{
    public class DbUnitOfWork : IUnitOfWork
    {
        private readonly Context.MyAccountsDbContext context;

        private IDbContextTransaction transaction;

        public DbUnitOfWork(Context.MyAccountsDbContext context)
        {
            this.context = context;
        }

        public void BeginTransaction()
        {
            transaction = context.Database.BeginTransaction();
        }

        public void Commit()
        {
            context.SaveChanges();
            transaction.Commit();
        }

        public void Rollback()
        {
            try
            {
                if (transaction != null)
                {
                    transaction.Rollback();
                }
            }
            finally
            {
                transaction.Dispose();
            }
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    transaction?.Dispose();
                    context?.Dispose();
                }
                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~DbUnitOfWork()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}

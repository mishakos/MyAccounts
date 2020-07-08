using Microsoft.EntityFrameworkCore;

using MyAccounts.Core.Accounts;
using MyAccounts.Core.ApplicationUser;
using MyAccounts.Core.BankAccounts;
using MyAccounts.Core.Banks;
using MyAccounts.Core.Clients;
using MyAccounts.Core.Currencies;
using MyAccounts.Core.Expences;
using MyAccounts.Core.Incomes;

namespace MyAccounts.Context
{
    public class MyAccountsDbContext : DbContext
    {
        public MyAccountsDbContext(DbContextOptions<MyAccountsDbContext> options) : base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountSubconto> AccountSubcontos { get; set; }
        public DbSet<SubcontoType> SubcontoTypes { get; set; }

        public DbSet<EconomicOperation> EconomicOperations { get; set; }
        public DbSet<Movement> Movements { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<CurrencyRate> CurrencyRates { get; set; }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expence> Expences { get; set; }

        public DbSet<Bank> Banks { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movement>().Property(p => p.QuantityDt).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Movement>().Property(p => p.QuantityKt).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Movement>().Property(p => p.AmountDt).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Movement>().Property(p => p.AmountKt).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Movement>()
                .HasOne(p => p.DebetAccount)
                .WithMany()
                .HasForeignKey(p => p.DebetAccountId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Movement>()
                .HasOne(p => p.KreditAccount)
                .WithMany()
                .HasForeignKey(p => p.KreditAccountId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CurrencyRate>().Property(p => p.Rate).HasColumnType("decimal(18,6)");
            modelBuilder.Entity<Currency>().Property(p => p.Code).HasMaxLength(3);
            modelBuilder.Entity<Income>().HasOne(p => p.Client).WithMany().HasForeignKey(p => p.ClientId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Income>().HasOne(p => p.Currency).WithMany().HasForeignKey(p => p.CurrencyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Income>().Property(p => p.Amount).HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Expence>().HasOne(p => p.Client).WithMany().HasForeignKey(p => p.ClientId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Expence>().HasOne(p => p.Currency).WithMany().HasForeignKey(p => p.CurrencyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Expence>().Property(p => p.Amount).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Bank>().HasOne(p => p.Parent).WithMany().HasForeignKey(p => p.ParentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BankAccount>().HasOne(p => p.Currency).WithMany().HasForeignKey(p => p.CurrencyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BankAccount>().HasOne(p => p.Owner).WithMany().HasForeignKey(p => p.OwnerId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BankAccount>().HasOne(p => p.Bank).WithMany().HasForeignKey(p => p.BankId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Currency>().HasData(new Currency
            {
                Id = 1,
                Code = "980",
                Name = "US Dollar",
                ShortCode = "USD",
                Symbol = "$"
            },
            new Currency
            {
                Id = 2,
                Code = "978",
                Name = "Euro",
                ShortCode = "EUR",
                Symbol = "E"
            });

        }
    }
}

namespace MyAccounts.Application.Configs
{
    using Autofac;

    using MyAccounts.Application.Accounts;
    using MyAccounts.Application.Banks;
    using MyAccounts.Application.Clients;
    using MyAccounts.Application.Connections;
    using MyAccounts.Application.Currencies;
    using MyAccounts.Application.Login;
    using MyAccounts.Core.ApplicationUser;
    using MyAccounts.Helpers.Repository;
    using MyAccounts.Repositories;

    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserService>().As<IUserService>();
            builder.RegisterType<AccountService>().As<IAccountService>();
            builder.RegisterType<ApplicationUserRepository>().As<IRepository<ApplicationUser>>();
            builder.RegisterType<DbUnitOfWork>().As<IUnitOfWork>();
            builder.RegisterType<AccountRepository>().As<IAccountRepository>();
            builder.RegisterType<AccountService>().As<IAccountService>();
            builder.RegisterType<CurrencyRepository>().As<ICurrencyRepository>();
            builder.RegisterType<CurrencyAppService>().As<ICurrencyAppService>();
            builder.RegisterType<CurrencyRateRepository>().As<ICurrencyRateRepository>();
            builder.RegisterType<BankApiService>().As<IBankApiService>();
            builder.RegisterType<BankAppService>().As<IBankAppService>();
            builder.RegisterType<BankRepository>().As<IBankRepository>();
            builder.RegisterType<ClientRepository>().As<IClientRepository>();
            builder.RegisterType<ClientAppService>().As<IClientAppService>();
        }
    }
}

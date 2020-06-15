using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MyAccounts.Context;

namespace MyAccounts.Application.Configs
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection AddMyAccountsDb(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<MyAccountsDbContext>(options =>
            {
                options.EnableDetailedErrors();
                options.EnableSensitiveDataLogging();
                options.UseSqlServer(configuration.GetConnectionString("MyAccountsDb"), b => b.MigrationsAssembly("MyAccounts.Migrations"));
            });
            return services;
        }
    }
}

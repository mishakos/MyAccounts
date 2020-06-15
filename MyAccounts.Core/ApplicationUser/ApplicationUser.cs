using MyAccounts.Helpers.Domain;
using MyAccounts.Security;

using System;

namespace MyAccounts.Core.ApplicationUser
{
    public class ApplicationUser : IAggregateRoot
    {
        public ApplicationUser()
        {

        }
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }

        public static ApplicationUser Create(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentNullException("username or password");
            }
            var user = new ApplicationUser
            {
                UserName = userName,
                PasswordSalt = SecurityManager.GeneratePasswordSalt(DateTime.UtcNow)
            };
            user.Password = SecurityManager.GeneratePasswordHash(password, user.PasswordSalt);

            DomainEvents.Raise(new ApplicationUserCreated() { User = user });

            return user;
        }

        public bool PasswordIsValid(string password)
        {
            var passwordHash = SecurityManager.GeneratePasswordHash(password, this.PasswordSalt);
            return passwordHash == this.Password;
        }
    }
}

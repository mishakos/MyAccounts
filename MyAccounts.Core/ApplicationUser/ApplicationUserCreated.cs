using MyAccounts.Helpers.Domain;

namespace MyAccounts.Core.ApplicationUser
{
    public class ApplicationUserCreated : DomainEvent
    {
        public ApplicationUser User { get; set; }

        public override void Flatten()
        {
            this.Args.Add(nameof(this.User.Id), this.User.Id);
            this.Args.Add(nameof(this.User.UserName), this.User.UserName);
            this.Args.Add(nameof(this.User.Password), this.User.Password);
            this.Args.Add(nameof(this.User.PasswordSalt), this.User.PasswordSalt);
        }
    }
}
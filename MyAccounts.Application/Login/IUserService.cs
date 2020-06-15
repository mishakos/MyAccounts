namespace MyAccounts.Application.Login
{
    public interface IUserService
    {
        TokenViewModel Login(LoginViewModel model);
        TokenViewModel Registrate(RegistrateViewModel model);
        UserViewModel GetUserInfoByName(string userName);
    }
}

using MyAccounts.Core.ApplicationUser;
using MyAccounts.Helpers.Repository;
using MyAccounts.Helpers.Specification;
using MyAccounts.Security;

using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace MyAccounts.Application.Login
{
    public class UserService : IUserService
    {
        private readonly IRepository<ApplicationUser> repository;
        private readonly IUnitOfWork unitOfWork;

        public UserService(IRepository<ApplicationUser> repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }
        public TokenViewModel Login(LoginViewModel model)
        {
            ISpecification<ApplicationUser> alreadyRegisteredSpec = new AppUserAlreadyRegisteredSpec(model.UserName);
            var existingUser = repository.FindOne(alreadyRegisteredSpec);
            if (existingUser == null)
                throw new Exception("UserName or Password is invalid!");
            if (existingUser.PasswordIsValid(model.Password))
            {
                return GenerateToken(existingUser);
            }
            throw new Exception("UserName or Password is invalid!");
        }

        private TokenViewModel GenerateToken(ApplicationUser existingUser)
        {
            var identity = GetIdentity(existingUser);
            var token = SecurityManager.GenerateToken(identity.Claims);

            return new TokenViewModel()
            {
                Token = token,
                UserName = existingUser.UserName
            };
        }

        public TokenViewModel Registrate(RegistrateViewModel model)
        {
            ISpecification<ApplicationUser> alreadyRegisteredSpec = new AppUserAlreadyRegisteredSpec(model.UserName);
            var existingUser = repository.FindOne(alreadyRegisteredSpec);
            if (existingUser != null)
                throw new Exception("User already registered.");

            var newUser = ApplicationUser.Create(model.UserName, model.Password);
            unitOfWork.BeginTransaction();
            repository.Add(newUser);
            unitOfWork.Commit();

            return GenerateToken(newUser);
        }

        private static ClaimsIdentity GetIdentity(ApplicationUser existingUser)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, existingUser.UserName)
                };
            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        public UserViewModel GetUserInfoByName(string userName)
        {
            ISpecification<ApplicationUser> alreadyRegisteredSpec = new AppUserAlreadyRegisteredSpec(userName);
            var existingUser = repository.FindOne(alreadyRegisteredSpec);
            var user = new UserViewModel()
            {
                Id = existingUser.Id,
                Name = existingUser.UserName
            };
            return user;

        }
    }
}

using Microsoft.IdentityModel.Tokens;

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MyAccounts.Security
{
    public static class SecurityManager
    {
        public static string GeneratePasswordSalt(DateTime date)
        {
            using (var provider = new SHA256CryptoServiceProvider())
            {
                var salt = date.ToBinary().ToString();
                return Convert.ToBase64String(provider.ComputeHash(Encoding.UTF8.GetBytes(salt)));
            }
        }

        public static string GeneratePasswordHash(string password, string passwordSalt)
        {
            using (var provider = new HMACSHA512(Convert.FromBase64String(passwordSalt)))
            {
                return Convert.ToBase64String(provider.ComputeHash(Encoding.UTF8.GetBytes(password)));
            }
        }

        public static string GenerateToken(IEnumerable<Claim> claims)
        {
            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
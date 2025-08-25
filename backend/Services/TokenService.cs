using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Service
{
    public class TokenService : ITokenService

    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
   

        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]!));
           
        }
        public string CreateAsync(AppUser appUser, IList<string> roles)
        {
            var claims = new List<Claim>
            {
               new Claim(ClaimTypes.Name, appUser.UserName!),
                new Claim(JwtRegisteredClaimNames.Email, appUser.Email!),
                new Claim(JwtRegisteredClaimNames.GivenName, appUser.UserName!),
                
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
             
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"],
                 
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        
    }
}
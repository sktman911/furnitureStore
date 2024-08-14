using FurnitureAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FurnitureAPI.Helpers
{
    public class TokenHelper
    {
        public static string GenerateJWTToken(object model, IConfiguration configuration)
        {
            var key = configuration["Jwt:Key"];
            var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signCredential = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();
            if (model is Customer customer)
            {
                claims.Add(new Claim("cusId", customer.CusId.ToString()));
                claims.Add(new Claim("username", customer.Username!));
            }
            else if (model is Employee employee)
            {
                claims.Add(new Claim("empId", employee.EmpId.ToString()));
                claims.Add(new Claim("username", employee.Username!));
                claims.Add(new Claim("role", employee.Role!.RoleName!));
            }

            // create token
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: signCredential,
                claims: claims
            );
            // new string token
            var furnitureToken = new JwtSecurityTokenHandler().WriteToken(token);
            return furnitureToken;
        }
    }
}

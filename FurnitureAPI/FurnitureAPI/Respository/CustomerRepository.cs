using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FurnitureAPI.Respository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly FurnitureContext _context;
        private readonly IConfiguration _configuration;
        public CustomerRepository(FurnitureContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public Task<Customer?> Add(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Task<Customer?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Customer>> GetAll()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> GetById(int id)
        {
            var existedCustomer = await _context.Customers.SingleOrDefaultAsync(x => x.CusId == id);
            return existedCustomer!;
        }

        public async Task<Customer?> Update(int id, Customer customer)
        {
            var existedCustomer = await _context.Customers.SingleOrDefaultAsync(x => x.CusId == id);
            if(existedCustomer == null)
            {
                return null;
            }

            if (existedCustomer.Username != customer.Username)
            {
                existedCustomer.Username = customer.Username;
                // request customer pass or do below
                existedCustomer.CusName = customer.CusName;
                existedCustomer.CusPhone = customer.CusPhone;
                existedCustomer.CusAddress = customer.CusAddress;
                existedCustomer.DoB = customer.DoB;
                existedCustomer.Email = customer.Email;               

                var key = _configuration["Jwt:Key"];
                var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var signCredential = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim>
                {
                    new Claim("cusId", existedCustomer.CusId.ToString()),
                     new Claim("username", existedCustomer.Username!)
                };

                // create token
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signCredential,
                    claims: claims
                );

                // new string token
                var furnitureToken = new JwtSecurityTokenHandler().WriteToken(token);
                await _context.SaveChangesAsync();              
                return customer;
            }
            existedCustomer.CusId = 0;
            return existedCustomer;
        }
    }
}

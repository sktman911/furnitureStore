using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
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
        public CustomerRepository(FurnitureContext context)
        {
            _context = context;
        }
        public Task Add(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Customer customer)
        {
            throw new NotImplementedException();
        }

        public async Task<Customer?> FindByName(string name)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(x => x.Username == name);
            return customer;
        }

        public async Task<IEnumerable<Customer>> GetAll()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer?> GetById(int id)
        {
            var existedCustomer = await _context.Customers.SingleOrDefaultAsync(x => x.CusId == id);
            return existedCustomer!;
        }

        public async Task Update(Customer customer)
        {
            await _context.SaveChangesAsync();
        }
    }
}

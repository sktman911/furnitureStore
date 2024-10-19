using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FurnitureAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task AddCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCustomer(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Customer>> GetAllCustomers()
        {
            var customers = await _unitOfWork.Customers.GetAll();
            return customers;
        }

        public Task<Customer?> GetCustomerById(int id)
        {
            var customer = _unitOfWork.Customers.GetById(id);
            return customer;
        }

        public async Task UpdateCustomer(int id, Customer customer)
        {
            var existedCustomer = await _unitOfWork.Customers.GetById(id);
            if(existedCustomer == null)
            {
                throw new KeyNotFoundException();
            }

            if (existedCustomer.Username == customer.Username)
            {
                existedCustomer.Username = customer.Username;
                // request customer pass or do below
                existedCustomer.Status = true;
                existedCustomer.CusName = customer.CusName;
                existedCustomer.CusPhone = customer.CusPhone;
                existedCustomer.CusAddress = customer.CusAddress;
                existedCustomer.DoB = customer.DoB;
                existedCustomer.Email = customer.Email;           
                await _unitOfWork.Customers.Update(existedCustomer);
            }
            else if(existedCustomer.Username != customer.Username)
            {
                var checkUsername = await _unitOfWork.Customers.FindByName(customer.Username!);
                if(checkUsername != null)
                {
                    throw new BadHttpRequestException("Username has existed!",StatusCodes.Status400BadRequest);
                }
                checkUsername!.Username = customer.Username;
                checkUsername.Status = true;
                checkUsername.CusName = customer.CusName;
                checkUsername.CusPhone = customer.CusPhone;
                checkUsername.CusAddress = customer.CusAddress;
                checkUsername.DoB = customer.DoB;
                checkUsername.Email = customer.Email;
                await _unitOfWork.Customers.Update(checkUsername);
            }
            else
            {
                throw new DbUpdateException();
            }
        }
    }
}

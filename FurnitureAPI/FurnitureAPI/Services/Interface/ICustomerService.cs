using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetAllCustomers();

        Task<Customer?> GetCustomerById(int id);

        Task AddCustomer(Customer category);

        Task UpdateCustomer(int id, Customer category);

        Task DeleteCustomer(int id);
    }
}

using FurnitureAPI.Models;
using FurnitureAPI.Services.Momo;

namespace FurnitureAPI.Interface
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order?> UpdateStatus(int id);
        Task<IEnumerable<Order>> GetOrdersByCustomer(int id);

    }
}

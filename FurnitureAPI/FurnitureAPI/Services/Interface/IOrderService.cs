using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<IEnumerable<Order>> GetOrdersByCustomerId(int customerId);

        Task<Order?> GetOrderById(int id);

        Task AddOrder(Order order);

        Task UpdateOrder(int id, Order order);

        Task DeleteOrder(int id);
    }
}

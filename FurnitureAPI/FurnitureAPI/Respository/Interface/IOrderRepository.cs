using FurnitureAPI.Models;
using FurnitureAPI.Services.Momo;

namespace FurnitureAPI.Respository.Interface
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersByCustomer(int id);
        Task<OrderStatus?> GetOrderStatusByOrderId(int orderMethodId);

        Task<OrderMethod?> GetOrderMethodByOrderId(int orderStatusId);

    }
}

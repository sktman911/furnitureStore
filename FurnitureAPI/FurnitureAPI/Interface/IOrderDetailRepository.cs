using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface IOrderDetailRepository : IGenericRepository<OrderDetail>
    {
        Task<IEnumerable<OrderDetail?>> GetOrderDetailByOrderId(int id);
        Task<IEnumerable<OrderDetail>> AddListOrderDetail(Order order);
    }
}

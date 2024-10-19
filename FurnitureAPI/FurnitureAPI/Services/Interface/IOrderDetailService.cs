using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IOrderDetailService
    {
        Task<IEnumerable<OrderDetail?>> GetOrderDetailByOrderId(int orderId);

        //Task AddListOrderDetail(Order order);
    }
}

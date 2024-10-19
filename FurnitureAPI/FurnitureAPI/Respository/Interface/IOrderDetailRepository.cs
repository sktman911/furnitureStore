using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IOrderDetailRepository : IGenericRepository<OrderDetail>
    {
        Task<IEnumerable<OrderDetail?>> GetOrderDetailByOrderId(int id);
        Task AddListOrderDetail(List<OrderDetail> list);
    }
}

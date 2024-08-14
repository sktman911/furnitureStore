using FurnitureAPI.Models;
using FurnitureAPI.TempModels;

namespace FurnitureAPI.Interface
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<ProductInfo> GetProductCustom(int id, HttpRequest request);

        Task<IEnumerable<ProductInfo>> GetAllCustom(HttpRequest request);

        Task<IEnumerable<ProductInfo>> GetTopProductsByDesc(HttpRequest request);
    }
}

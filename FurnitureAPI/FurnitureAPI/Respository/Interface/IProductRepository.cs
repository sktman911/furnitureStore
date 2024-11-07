using FurnitureAPI.Models;
using FurnitureAPI.TempModels;

namespace FurnitureAPI.Respository.Interface
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<Product> GetProductCustom(int id);

        Task<IEnumerable<Product>> GetAllActiveProducts();

        Task<IEnumerable<Product>> GetTopProductsByDesc();

        Task<IEnumerable<Product>> GetFavouriteProducts(int customerId);


    }
}

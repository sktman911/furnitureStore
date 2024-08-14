using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface IProductSizeColorRepository : IGenericRepository<ProductSizeColor>
    {
        Task<IEnumerable<ProductSizeColor>> GetAllCustom(int id);
    }
}

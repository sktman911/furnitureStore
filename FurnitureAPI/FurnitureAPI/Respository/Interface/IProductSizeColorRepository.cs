using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IProductSizeColorRepository : IGenericRepository<ProductSizeColor>
    {
        Task<ProductSizeColor?> GetById(int? productId, int? sizeId, int? colorId);
        Task<IEnumerable<ProductSizeColor>> GetListById(int id);

    }
}

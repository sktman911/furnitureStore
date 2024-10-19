using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IProductSizeColorService
    {
        Task<IEnumerable<ProductSizeColor>> GetProductSizeColorsByProductId(int productId);
        Task<IEnumerable<ProductSizeColor>> GetAllProductSizeColors();

        Task<ProductSizeColor?> GetProductSizeColorById(int id);

        Task AddProductSizeColor(ProductSizeColor productSizeColor);

        Task UpdateProductSizeColor(int id, ProductSizeColor productSizeColor);

        Task DeleteProductSizeColor(int id);
    }
}

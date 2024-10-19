using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Services.Interface
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetTopProducts();
        Task<IEnumerable<Product>> GetAllActiveProducts();

        Task<Product?> GetProductInfo(int id );

        Task<Product?> GetProductById(int id);

        Task<IEnumerable<Product>> GetFavouriteProducts(int customerId);

        Task AddProduct(Product category);

        Task UpdateProduct(int id, Product category);

        Task DeleteProduct(int id);

        byte[] ExportExcel(IEnumerable<Product> products);

        Task ImportExcel(IFormFile formFile);
    }
}

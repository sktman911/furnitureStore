using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IImageService
    {
        Task<IEnumerable<Image>> GetSubImagesByProductId(int productId, HttpRequest httpRequest);

        Task<Image?> GetImageById(int id);

        Task AddImageByProduct(int productId, IFormFile productImageFile);
        Task UpdateImageByProduct(int productId, IFormFile productImageFile);

        Task AddImages(Image image);

        Task UpdateImages(Image image);

        Task DeleteImage(int id);
    }
}

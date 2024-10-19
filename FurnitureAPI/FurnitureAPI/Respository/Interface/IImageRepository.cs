using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IImageRepository : IGenericRepository<Image>
    {
        Task<IEnumerable<Image>> GetListById(int id);

        Task AddListImages(List<Image> images);

        Task UpdateListImages(List<Image> images);

        Task<Image> GetMainImageByProductId(int productId);
    }
}

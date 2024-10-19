using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IColorService
    {
        Task<IEnumerable<Color>> GetColors();

        Task<IEnumerable<Color>> GetColorsByProductId(int productId);

        Task<Color?> GetColorById(int id);

        Task AddColor(Color category);

        Task UpdateColor(int id, Color category);

        Task DeleteColor(int id);
    }
}

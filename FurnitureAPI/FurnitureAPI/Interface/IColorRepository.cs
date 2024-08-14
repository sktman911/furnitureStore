using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface IColorRepository : IGenericRepository<Color>
    {
        Task<IEnumerable<Color>> GetColorsByProduct(int id);
    }
}

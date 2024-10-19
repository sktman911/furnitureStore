using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IColorRepository : IGenericRepository<Color>
    {
        Task<IEnumerable<Color>> GetColorsByProductId(int id);

        Task<Color?> FindByName(string name);

    }
}

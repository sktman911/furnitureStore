using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface ISizeRepository : IGenericRepository<Size>
    {
        Task<IEnumerable<Size>> GetSizesByProductId(int id);
    }
}

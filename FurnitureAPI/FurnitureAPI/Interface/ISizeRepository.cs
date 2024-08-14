using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface ISizeRepository : IGenericRepository<Size>
    {
        Task<IEnumerable<Size>> GetSizesByProduct(int id);
    }
}

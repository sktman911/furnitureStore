using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface IImageRepository : IGenericRepository<Image>
    {
        Task<IEnumerable<Image>> GetListById(int id, HttpRequest request);   
    }
}

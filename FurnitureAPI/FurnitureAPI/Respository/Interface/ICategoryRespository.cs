using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface ICategoryRespository : IGenericRepository<Category>
    {
        Task<Category?> FindByName(string name);
    }
}

using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IFunctionRepository : IGenericRepository<Function>
    { 
        Task<IEnumerable<Function>> GetTitles();
    }
}

using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface IFunctionRepository : IGenericRepository<Function>
    {
        Task<IEnumerable<Function>> GetListTitle();
    }
}

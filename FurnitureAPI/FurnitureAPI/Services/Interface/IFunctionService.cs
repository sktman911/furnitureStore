using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IFunctionService
    {
        Task<IEnumerable<Function>> GetFunctionsTitle();

        Task<IEnumerable<Function>> GetAllFunctions();
    }
}

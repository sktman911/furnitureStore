using FurnitureAPI.Models;
using FurnitureAPI.TempModels;

namespace FurnitureAPI.Interface
{
    public interface ISubCategoryRepository : IGenericRepository<SubCategory>
    {
        Task<IEnumerable<SubCategoryInfo>> GetAllCustom();
    }
}

using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface ISubCategoryService
    {
        Task<IEnumerable<SubCategory>> GetSubCategories();

        Task<SubCategory?> GetSubCategoryById(int id);

        Task AddSubCategory(SubCategory category);

        Task UpdateSubCategory(int id, SubCategory category);

        Task DeleteSubCategory(int id);
    }
}

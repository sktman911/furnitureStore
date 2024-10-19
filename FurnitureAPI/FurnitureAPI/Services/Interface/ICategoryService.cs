using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategories();

        Task<Category?> GetCategoryById(int id);

        Task AddCategory(Category category);

        Task UpdateCategory(int id, Category category);

        Task DeleteCategory(int id);
    }
}

using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddCategory(Category category)
        {
            var existedCategory = await _unitOfWork.Categories.FindByName(category.CategoryName!);
            if(existedCategory != null)
            {
                throw new KeyNotFoundException();
            }
            await _unitOfWork.Categories.Add(category);
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _unitOfWork.Categories.GetById(id);
            if (category == null)
            {
                throw new KeyNotFoundException();
            }
            await _unitOfWork.Categories.Delete(category);
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var categories = await _unitOfWork.Categories.GetAll();
            return categories;
        }

        public async Task<Category?> GetCategoryById(int id)
        {
            var category = await _unitOfWork.Categories.GetById(id);
            if (category == null) return null;
            return category;
        }

        public async Task UpdateCategory(int id, Category category)
        {
            var existedCategory = await _unitOfWork.Categories.GetById(id);
            if (existedCategory == null)
            {
                throw new KeyNotFoundException();
            }
            
            existedCategory.CategoryName = category.CategoryName;

            await _unitOfWork.Categories.Update(existedCategory);

        }
    }
}

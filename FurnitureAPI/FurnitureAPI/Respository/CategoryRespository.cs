using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class CategoryRespository : ICategoryRespository
    {
        private readonly FurnitureContext _context;
        public CategoryRespository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task<Category?> Add(Category category)
        {
            try
            {
                await _context.Categories.AddAsync(category);
                await _context.SaveChangesAsync();
                return category;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Category?> Delete(int id)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == id);
            if(category == null)
            {
                return null;
            }
            try
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return category;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetById(int id)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == id);
            return category!;
        }

        public async Task<Category?> Update(int id, Category category)
        {
            var existedCategory = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == id);
            if(existedCategory == null)
            {
                return null;
            }

            existedCategory.CategoryId = category.CategoryId;
            existedCategory.CategoryName = category.CategoryName;
            await _context.SaveChangesAsync();
            return existedCategory;

        }
    }
}

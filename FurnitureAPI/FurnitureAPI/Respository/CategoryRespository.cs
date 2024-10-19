using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
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

        public async Task Add(Category category)
        {
              await _context.Categories.AddAsync(category);
              await _context.SaveChangesAsync();
        }

        public async Task Delete(Category category)
        {
             _context.Categories.Remove(category);
             await _context.SaveChangesAsync();
        }

        public async Task<Category?> FindByName(string name)
        {
            var existedCategory =  await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName == name);
            return existedCategory;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(int id)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == id);
            return category;
        }

        public async Task Update(Category category)
        {
            // update 
            await _context.SaveChangesAsync();
        }
    }
}

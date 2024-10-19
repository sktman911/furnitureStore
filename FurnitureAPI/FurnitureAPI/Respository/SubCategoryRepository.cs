using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class SubCategoryRepository : ISubCategoryRepository
    {
        private readonly FurnitureContext _context;
        public SubCategoryRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task Add(SubCategory subCategory)
        {
            await _context.SubCategories.AddAsync(subCategory);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(SubCategory subCategory)
        {
            _context.SubCategories.Remove(subCategory);
             await _context.SaveChangesAsync();
        }

        public async Task<SubCategory?> GetById(int id)
        {
            var subCategory = await _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryId == id);
            return subCategory;
        }

        public async Task Update(SubCategory subCategory)
        {
            await _context.SaveChangesAsync();
        }

        public Task<SubCategory?> FindByName(string name)
        {
            var existedSubCategory = _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryName == name);
            return existedSubCategory;
        }

        public async Task<IEnumerable<SubCategory>> GetAll()
        {
            var subCategories = await _context.SubCategories
                                .Include(x => x.Category)
                                .Select(s => new SubCategoryInfo
                                {
                                    SubCategoryId = s.SubCategoryId,
                                    SubCategoryName = s.SubCategoryName,
                                    CategoryId = s.CategoryId,
                                    CategoryName = s.Category!.CategoryName
                                })
                                .ToListAsync();
            return subCategories;
        }
    }
}

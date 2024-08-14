using FurnitureAPI.Interface;
using FurnitureAPI.Models;
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

        public async Task<SubCategory?> Add(SubCategory subCategory)
        {
            await _context.SubCategories.AddAsync(subCategory);
            await _context.SaveChangesAsync();
            return subCategory;
        }

        public async Task<SubCategory?> Delete(int id)
        {
            var subCategory = await _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryId == id);
            if (subCategory == null)
            {
                return null;
            }
            _context.SubCategories.Remove(subCategory);
             await _context.SaveChangesAsync();
             return subCategory;
        }

        public async Task<SubCategory> GetById(int id)
        {
            var subCategory = await _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryId == id);
            return subCategory!;
        }

        public async Task<SubCategory?> Update(int id, SubCategory subCategory)
        {
            var result = await _context.SubCategories.SingleOrDefaultAsync(x => x.SubCategoryId == id);
            if (result == null)
            {
                return null;
            }

            result.SubCategoryId = subCategory.SubCategoryId;
            result.SubCategoryName = subCategory.SubCategoryName;
            result.CategoryId = subCategory.CategoryId;
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<IEnumerable<SubCategoryInfo>> GetAllCustom()
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

        public Task<IEnumerable<SubCategory>> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}

using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;

namespace FurnitureAPI.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        public SubCategoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddSubCategory(SubCategory subCategory)
        {
            var existedSubCategory = _unitOfWork.SubCategories.FindByName(subCategory.SubCategoryName!);
            if(existedSubCategory != null)
            {
                throw new KeyNotFoundException();
            }
            await _unitOfWork.SubCategories.Add(subCategory);
        }

        public async Task DeleteSubCategory(int id)
        {
            var existedSubCategory = await _unitOfWork.SubCategories.GetById(id);
            if(existedSubCategory == null)
            {
                throw new KeyNotFoundException();
            }
            await _unitOfWork.SubCategories.Delete(existedSubCategory);
        }

        public async Task<IEnumerable<SubCategory>> GetSubCategories()
        {
            var subCategories = await _unitOfWork.SubCategories.GetAll();
            return subCategories;
        }

        public Task<SubCategory?> GetSubCategoryById(int id)
        {
            var subCategory = _unitOfWork.SubCategories.GetById(id);
            return subCategory;
        }

        public async Task UpdateSubCategory(int id, SubCategory subCategory)
        {
            var existedSubCategory = await _unitOfWork.SubCategories.GetById(id);
            if(existedSubCategory == null)
            {
                throw new KeyNotFoundException();
            }

            existedSubCategory.SubCategoryName = subCategory.SubCategoryName;
            existedSubCategory.CategoryId = subCategory.CategoryId;
            await _unitOfWork.SubCategories.Update(subCategory);
        }
    }
}

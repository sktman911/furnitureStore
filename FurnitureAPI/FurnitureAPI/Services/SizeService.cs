using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class SizeService : ISizeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public SizeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<IEnumerable<Size>> GetSizes()
        {
            var sizes = await _unitOfWork.Sizes.GetAll();
            return sizes;
        }

        public async Task<IEnumerable<Size>> GetSizesByProductId(int productId)
        {
            var result = await _unitOfWork.Sizes.GetSizesByProductId(productId);
            return result;
        }
    }
}

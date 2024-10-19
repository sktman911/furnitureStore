using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class ProductSizeColorService : IProductSizeColorService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductSizeColorService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddProductSizeColor(ProductSizeColor productSizeColor)
        {
            var existedPsc = await _unitOfWork.ProductSizeColors.GetById(productSizeColor.ProductId,productSizeColor.SizeId,productSizeColor.ColorId);

            if (existedPsc != null)
            {
                throw new DbUpdateException();
            }

            await _unitOfWork.ProductSizeColors.Add(productSizeColor);
        }

        public async Task UpdateProductSizeColor(int id, ProductSizeColor productSizeColor)
        {
            var existedPsc = await _unitOfWork.ProductSizeColors.GetById(id);
            if(existedPsc == null)
            {
                throw new KeyNotFoundException();
            }
            existedPsc.SizeId = productSizeColor.SizeId;
            existedPsc.ColorId = productSizeColor.ColorId;
            existedPsc.Quantity = productSizeColor.Quantity;
            await _unitOfWork.ProductSizeColors.Update(productSizeColor);
        }

        public async Task<IEnumerable<ProductSizeColor>> GetProductSizeColorsByProductId(int productId)
        {
            var productSizeColors =  await _unitOfWork.ProductSizeColors.GetListById(productId);
            return productSizeColors;
        }

        public Task<IEnumerable<ProductSizeColor>> GetAllProductSizeColors()
        {
            throw new NotImplementedException();
        }

        public Task DeleteProductSizeColor(int id)
        {
            throw new NotImplementedException();
        }


        public Task<ProductSizeColor?> GetProductSizeColorById(int id)
        {
            throw new NotImplementedException();
        }

    }
}

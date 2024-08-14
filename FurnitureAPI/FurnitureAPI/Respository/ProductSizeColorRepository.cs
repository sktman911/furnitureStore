using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class ProductSizeColorRepository : IProductSizeColorRepository
    {
        private readonly FurnitureContext _context;
        public ProductSizeColorRepository(FurnitureContext context)
        {
            _context = context;
        }
        public async Task<ProductSizeColor?> Add(ProductSizeColor productSizeColor)
        {
            var existedPsc = await _context.ProductSizeColors.Where(x => x.ProductId == productSizeColor.ProductId
                && x.SizeId == productSizeColor.SizeId
                && x.ColorId == productSizeColor.ColorId).FirstOrDefaultAsync();

            if (existedPsc != null)
            {
                return null;
            }

            _context.ProductSizeColors.Add(productSizeColor);
            await _context.SaveChangesAsync();
            return productSizeColor;
        }

        public async Task<ProductSizeColor?> Update(int id, ProductSizeColor productSizeColor)
        {
            _context.Entry(productSizeColor).State = EntityState.Modified;
              await _context.SaveChangesAsync();
            return productSizeColor;
        }

        public async Task<IEnumerable<ProductSizeColor>> GetAllCustom(int id)
        {
            var result = await _context.ProductSizeColors.Where(x => x.ProductId == id).Select(s => new ProductSizeColorInfo
            {
                PscId = s.PscId,
                ProductId = s.ProductId,
                ColorId = s.ColorId,
                ColorName = s.Color!.ColorName,
                ColorHexcode = s.Color!.ColorHexcode,
                SizeId = s.SizeId,
                SizeName = s.Size!.SizeName,
                Quantity = s.Quantity
            }).ToListAsync();
            return result;
        }

        public Task<ProductSizeColor?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ProductSizeColor>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ProductSizeColor> GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

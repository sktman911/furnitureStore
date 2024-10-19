using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
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
        public async Task Add(ProductSizeColor productSizeColor)
        {
            _context.ProductSizeColors.Add(productSizeColor);
            await _context.SaveChangesAsync();
        }

        public async Task Update( ProductSizeColor productSizeColor)
        {
            
              await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductSizeColor>> GetListById(int id)
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

        public Task Delete(ProductSizeColor productSizeColor)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ProductSizeColor>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<ProductSizeColor?> GetById(int id)
        {
            var productSizeColor = await _context.ProductSizeColors.SingleOrDefaultAsync(x => x.PscId == id);
            return productSizeColor;
        }
        
        public async Task<ProductSizeColor?> GetById(int? productId, int? sizeId, int? colorId)
        {
            var existedPsc = await _context.ProductSizeColors.Where(x => x.ProductId == productId
                && x.SizeId == sizeId
                && x.ColorId == colorId).FirstOrDefaultAsync();
            return existedPsc;
        }

        public Task<ProductSizeColor?> FindByName(string name)
        {
            throw new NotImplementedException();
        }
    }
}

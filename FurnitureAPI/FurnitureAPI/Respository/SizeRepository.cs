using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class SizeRepository : ISizeRepository
    {
        private readonly FurnitureContext _context;
        public SizeRepository(FurnitureContext context)
        {
            _context = context;
        }
        public Task<Size?> Add(Size entity)
        {
            throw new NotImplementedException();
        }

        public Task<Size?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Size>> GetAll()
        {
            return await _context.Sizes.ToListAsync();
        }

        public Task<Size> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Size>> GetSizesByProduct(int id)
        {
            var result = await _context.Sizes.Where(x => x.ProductSizeColors.Any(y => y.SizeId == x.SizeId && y.ProductId == id)).ToListAsync();
            return result;
        }

        public Task<Size?> Update(int id, Size entity)
        {
            throw new NotImplementedException();
        }
    }
}

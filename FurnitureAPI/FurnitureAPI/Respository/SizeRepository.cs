using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
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
        public Task Add(Size size)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Size entity)
        {
            throw new NotImplementedException();
        }

        public Task<Size?> FindByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Size>> GetAll()
        {
            return await _context.Sizes.ToListAsync();
        }

        public async Task<Size?> GetById(int id)
        {
            var size = await _context.Sizes.SingleOrDefaultAsync(x => x.SizeId == id);
            return size;
        }

        public async Task<IEnumerable<Size>> GetSizesByProductId(int id)
        {
            var result = await _context.Sizes.Where(x => x.ProductSizeColors.Any(y => y.SizeId == x.SizeId && y.ProductId == id)).ToListAsync();
            return result;
        }

        public Task Update(Size size)
        {
            throw new NotImplementedException();
        }
    }
}

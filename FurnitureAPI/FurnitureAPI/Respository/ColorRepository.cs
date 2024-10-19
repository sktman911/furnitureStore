using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class ColorRepository : IColorRepository
    {
        private readonly FurnitureContext _context;
        public ColorRepository(FurnitureContext context)
        {
            _context = context;
        }
        public async Task Add(Color color)
        {
            await _context.Colors.AddAsync(color);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Color color)
        {
            _context.Colors.Remove(color);
            await _context.SaveChangesAsync();
        }

        public async Task<Color?> FindByName(string name)
        {
            var color = await _context.Colors.FirstOrDefaultAsync(x => x.ColorName == name);
            return color;
        }

        public async Task<IEnumerable<Color>> GetAll()
        {
            return await _context.Colors.ToListAsync();
        }

        public async Task<Color?> GetById(int id)
        {
            var color = await _context.Colors.SingleOrDefaultAsync(x => x.ColorId == id);
            return color;
        }

        public async Task<IEnumerable<Color>> GetColorsByProductId(int id)
        {
            var result = await _context.Colors.Where(x => x.ProductSizeColors.Any(y => y.ColorId == x.ColorId && y.ProductId == id)).ToListAsync();
            return result;
        }

        public async Task Update(Color color)
        {
            // update
            await _context.SaveChangesAsync();
        }
    }
}

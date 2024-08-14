using FurnitureAPI.Interface;
using FurnitureAPI.Models;
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
        public async Task<Color?> Add(Color color)
        {
            var existsColor = await _context.Colors.SingleOrDefaultAsync(x => x.ColorName == color.ColorName && x.ColorHexcode == color.ColorHexcode);

            if (existsColor != null)
            {
                return null;
            }

            await _context.Colors.AddAsync(color);
            await _context.SaveChangesAsync();
            return color;
        }

        public async Task<Color?> Delete(int id)
        {
            var color = await _context.Colors.SingleOrDefaultAsync(x => x.ColorId == id);
            if (color == null)
            {
                return null;
            }
            _context.Colors.Remove(color);
            await _context.SaveChangesAsync();
            return color;
        }

        public async Task<IEnumerable<Color>> GetAll()
        {
            return await _context.Colors.ToListAsync();
        }

        public Task<Color> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Color>> GetColorsByProduct(int id)
        {
            var result = await _context.Colors.Where(x => x.ProductSizeColors.Any(y => y.ColorId == x.ColorId && y.ProductId == id)).ToListAsync();
            return result;
        }

        public async Task<Color?> Update(int id, Color color)
        {
            var existedColor = await _context.Colors.SingleOrDefaultAsync(x => x.ColorId == id);
            if(existedColor == null)
            {
                return null;
            }

            existedColor.ColorName = color.ColorName;
            existedColor.ColorHexcode = color.ColorHexcode;
            await _context.SaveChangesAsync();
            return existedColor;
        }
    }
}

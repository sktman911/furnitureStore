using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class ImageRepository : IImageRepository
    {
        private readonly FurnitureContext _context;
        public ImageRepository(FurnitureContext context)
        {
            _context = context;
        }
        public async Task Add(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
        }

        public async Task AddListImages(List<Image> images)
        {
            await _context.Images.AddRangeAsync(images);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Image image)
        {
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
        }

        public Task<Image?> FindByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Image>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<Image?> GetById(int id)
        {
            var image = await _context.Images.FindAsync(id);
            return image;
        }

        public async Task<IEnumerable<Image>> GetListById(int id)
        {
            //var subImages = await _context.Images.Where(x => x.ImageMain != true && x.ProductId == id).ToListAsync();
            var subImages = await _context.Images.Where(x => x.ProductId == id).ToListAsync();
            return subImages;
        }

        public async Task UpdateListImages(List<Image> images)
        {
             _context.UpdateRange(images);
             await _context.SaveChangesAsync();
        }

        public async Task Update(Image entity)
        {
            await _context.SaveChangesAsync();
        }

        public async Task<Image> GetMainImageByProductId(int productId)
        {
            var image = await _context.Images.SingleOrDefaultAsync(x => x.ImageMain == true && x.ProductId == productId);
            return image!;
        }
    }
}

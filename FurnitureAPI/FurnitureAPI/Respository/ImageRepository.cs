using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class ImageRepository : IImageRepository
    {
        private readonly FurnitureContext _context;
        private readonly HandleImage _handleImage;
        public ImageRepository(FurnitureContext context, HandleImage handleImage)
        {
            _context = context;
            _handleImage = handleImage;
        }
        public async Task<Image?> Add([FromForm]Image image)
        {
            foreach (var file in image.ImageFiles!)
            {
                image.ImageId = 0;
                image.ImageSrc = await _handleImage.UploadImage(file);
                await _context.Images.AddAsync(image);
                await _context.SaveChangesAsync();
            }
            return image;
        }

        public Task<Image?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Image>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Image> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Image>> GetListById(int id, HttpRequest request)
        {
            var images = await _context.Images.Where(x => x.ImageMain != true && x.ProductId == id).Select(s => new Image
            {
                ImageId = s.ImageId,
                ImageMain = s.ImageMain,
                ImageSrc = s.ImageSrc,
                ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, s.ImageSrc)
            }).ToListAsync();

            return images;
        }

        public async Task<Image?> Update(int id, [FromForm]Image image)
        {
            var files = image.ImageFiles;
            var ids = image.Ids;

            for (int i = 0; i < files!.Count; i++)
            {
                var existImg = await _context.Images.FindAsync(ids![i]);
                if (existImg == null)
                {                   
                    return null;
                }
                existImg.ImageSrc = await _handleImage.UploadImage(files[i]);               
                _context.Entry(existImg).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return image;
        }
    }
}

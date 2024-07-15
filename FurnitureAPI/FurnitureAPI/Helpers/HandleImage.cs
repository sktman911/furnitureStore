using FurnitureAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace FurnitureAPI.Helpers
{
    public class HandleImage
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public HandleImage(IWebHostEnvironment hostEnvironment)
        {
            this._hostEnvironment = hostEnvironment;
        }

        [NonAction]
        public async Task<string> UploadImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).ToArray());
            //imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            imageName = imageName + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (!File.Exists(imagePath))
            {
                var fileStream = new FileStream(imagePath, FileMode.Create);
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }


    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using SixLabors.ImageSharp;
using System.IO;
using System.Threading.Tasks;

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
            //imageName = imageName + ".webp";
            imageName = imageName + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath,"Images", imageName);
            if (!File.Exists(imagePath))
            {
                var fileStream = new FileStream(imagePath, FileMode.Create);
                await imageFile.CopyToAsync(fileStream);

            }
            //if (!File.Exists(imagePath))
            //{
            //    using (var image = await Image.LoadAsync(imageFile.OpenReadStream()))
            //    {
            //        await image.SaveAsync(imagePath, new SixLabors.ImageSharp.Formats.Webp.WebpEncoder());
            //    }

            //}
            return imageName;
        }


    }
}

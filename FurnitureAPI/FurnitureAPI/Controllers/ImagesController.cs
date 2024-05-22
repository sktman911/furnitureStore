using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly FurnitureContext _context;
        private readonly HandleImage handleImage;

        public ImagesController(FurnitureContext context, HandleImage handleImage)
        {
            _context = context;
            this.handleImage = handleImage;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetSubImageById(int id)
        {
            var images = await _context.Images.Where(x => x.ImageMain != true && x.ProductId == id).Select(s => new Image
            {
                ImageId = s.ImageId,
                ImageMain = s.ImageMain,
                ImageSrc = s.ImageSrc,
                ImageLink = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, s.ImageSrc)
            }).ToListAsync();

            return images;
        }

        [HttpPost]
        public async Task<ActionResult<Image>> PostSubImage([FromForm] Image image)
        {
            if (image.ImageFiles == null)
            {
                return BadRequest();
            }

            foreach (var file in image.ImageFiles)
            {
                image.ImageId = 0;
                image.ImageSrc = await handleImage.UploadImage(file);
                await _context.Images.AddAsync(image);
                await _context.SaveChangesAsync();
            }

            return StatusCode(200);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutSubImage(int id, [FromForm] Image image)
        {
            if (image.ImageFiles == null)
            {
                return BadRequest();
            }

            if(id != image.ProductId)
            {
                return NotFound();
            }

            var files = image.ImageFiles;
            var ids = image.Ids;

            for (int i =0;i < files.Count; i++)
            {
                var existImg = await _context.Images.FindAsync(ids![i]);
                if(existImg == null)
                {
                    // response
                    return NotFound();
                }
                existImg.ImageSrc = await handleImage.UploadImage(files[i]);
                _context.Entry(existImg).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return StatusCode(200);
        }
    }
}

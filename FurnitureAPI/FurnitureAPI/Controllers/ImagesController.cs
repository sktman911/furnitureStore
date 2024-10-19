using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
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
        private readonly IImageService _imageService;

        public ImagesController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetSubImageById(int id)
        {
            var listSubImage = await _imageService.GetSubImagesByProductId(id,Request);
            return Ok(listSubImage);
        }

        [HttpPost]
        public async Task<ActionResult<Image>> PostSubImage([FromForm] Image image)
        {
            if (image.ImageFiles == null)
            {
                return BadRequest();
            }

            try
            {
                await _imageService.AddImages(image);
                return StatusCode(200);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

            try
            {
                await _imageService.UpdateImages(image);
                return StatusCode(200);
            }
            catch (BadHttpRequestException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

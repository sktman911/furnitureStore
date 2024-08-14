using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
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
        private readonly IUnitOfWork _unitOfWork;

        public ImagesController( IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetSubImageById(int id)
        {
            var listSubImage = await _unitOfWork.Images.GetListById(id,Request);
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
                await _unitOfWork.Images.Add(image);
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
                var updatedImages = await _unitOfWork.Images.Update(id, image);
                if (updatedImages == null)
                {
                    // response
                    return NotFound();
                }
                return StatusCode(200);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

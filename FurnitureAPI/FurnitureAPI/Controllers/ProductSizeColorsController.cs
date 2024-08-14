using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSizeColorsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductSizeColorsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<ProductSizeColor>> PostProductSizeColor(ProductSizeColor productSizeColor)
        {
            try
            {
                var addedPsc = await _unitOfWork.ProductSizeColors.Add(productSizeColor);
                
                if(addedPsc == null)
                {
                    return BadRequest(new {message="This kind of product has existed!"});
                }
                return StatusCode(200);
            }
            catch (Exception )
            {
                return BadRequest(new {message="Something went wrong. Please try again!"});
           }

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductSizeColor>>> GetProductSizeColors(int id)
        {

            var result = await _unitOfWork.ProductSizeColors.GetAllCustom(id);
            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePscQuantity(int id, ProductSizeColor productSizeColor)
        {
            if(id != productSizeColor.PscId)
            {
                return NotFound();
            }

            if(productSizeColor.Quantity < 1)
            {
                return BadRequest(new {message="Quantity must more than 1."});
            }
            
            try
            {
                await _unitOfWork.ProductSizeColors.Update(id, productSizeColor);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }


    }
}

using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
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
        private readonly IProductSizeColorService _productSizeColorService;

        public ProductSizeColorsController(IProductSizeColorService productSizeColorService)
        {
            _productSizeColorService = productSizeColorService;
        }

        [HttpPost]
        public async Task<ActionResult<ProductSizeColor>> PostProductSizeColor(ProductSizeColor productSizeColor)
        {
            try
            {
                await _productSizeColorService.AddProductSizeColor(productSizeColor);              
                return StatusCode(200);
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "This kind of product has existed!" });
            }
            catch (Exception )
            {
                return BadRequest(new {message="Something went wrong. Please try again!"});
           }

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductSizeColor>>> GetProductSizeColorsByProductId(int id)
        {

            var result = await _productSizeColorService.GetProductSizeColorsByProductId(id);
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
                await _productSizeColorService.UpdateProductSizeColor(id, productSizeColor);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}

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
        private readonly FurnitureContext _context;

        public ProductSizeColorsController(FurnitureContext context)
        {
            this._context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ProductSizeColor>> PostProductSizeColor(ProductSizeColor productSizeColor)
        {
            try
            {
                var check = await _context.ProductSizeColors.Where(x => x.ProductId == productSizeColor.ProductId 
                && x.SizeId == productSizeColor.SizeId 
                && x.ColorId == productSizeColor.ColorId).FirstOrDefaultAsync();
                
                if(check != null)
                {
                    return BadRequest();
                }

                _context.ProductSizeColors.Add(productSizeColor);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(200);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductSizeColor>>> GetProductSizeColors(int id)
        {

            var result = await _context.ProductSizeColors.Where(x => x.ProductId == id).Select(s => new ProductSizeColorInfo
            {
                PscId = s.PscId,
                ProductId = s.ProductId,
                ColorId = s.ColorId,
                ColorName = s.Color!.ColorName,
                ColorHexcode = s.Color!.ColorHexcode,
                SizeId = s.SizeId,
                SizeName = s.Size!.SizeName,
                Quantity = s.Quantity
            }).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpGet("/client/ProductSizeColors/{id}")]
        public async Task<ActionResult<IEnumerable<ProductSizeColor>>> GetProductSuzeColorsByClient(int id)
        {
            var result = await _context.ProductSizeColors.Where(x => x.ProductId == id && x.ColorId == x.Color!.ColorId).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }
    }
}

using FurnitureAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            int[] a = new int[] { -1,-1};
            Array.las
            try
            {

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(200);
        }
    }
}

using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizesController : ControllerBase
    {
        private readonly ISizeService _sizeService;
        public SizesController(ISizeService sizeService)
        {
            _sizeService = sizeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizes()
        {
            var sizes = await _sizeService.GetSizes();
            return Ok(sizes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizeByProduct(int id)
        {

            var result = await _sizeService.GetSizesByProductId(id);
            return Ok(result);
        }
    }
}

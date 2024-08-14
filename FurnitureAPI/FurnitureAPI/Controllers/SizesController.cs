using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public SizesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizes()
        {
            var sizes = await _unitOfWork.Sizes.GetAll();
            return Ok(sizes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizeByProduct(int id)
        {

            var result = await _unitOfWork.Sizes.GetSizesByProduct(id);
            return Ok(result);
        }
    }
}

using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderDetailController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetailByOrderId(int id)
        {
            try
            {
                var result = await _unitOfWork.OrderDetails.GetOrderDetailByOrderId(id);
                if(result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

    }
}

using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly FurnitureContext _context;

        public OrderDetailController(FurnitureContext context)
        {
            this._context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetailByOrderId(int id)
        {

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            try
            {
                var result = await _context.OrderDetails.Where(x => x.OrderId == order.OrderId).Select(x => new OrderDetailInfo
                {
                    OdId = x.OdId,
                    OrderId = x.OrderId,
                    Quantity = x.Quantity,
                    
                    ProductSizeColor = _context.ProductSizeColors.SingleOrDefault(y => y.PscId == x.PscId),
                    ProductName = _context.Products.SingleOrDefault(y => y.ProductId == x.ProductSizeColor!.ProductId)!.ProductName,
                    Price = _context.Products.SingleOrDefault(y => y.ProductId == x.ProductSizeColor!.ProductId)!.Price,
                    SizeName = _context.Sizes.SingleOrDefault(y => y.SizeId == x.ProductSizeColor!.SizeId)!.SizeName,
                    ColorName = _context.Colors.SingleOrDefault(y => y.ColorId == x.ProductSizeColor!.ColorId)!.ColorName,
                }).ToListAsync();   
                return result;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

    }
}

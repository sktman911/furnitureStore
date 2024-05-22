using FurnitureAPI.Models;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FurnitureContext _context; 
        private readonly IVnPayService _vpnPayService;
   

        public OrdersController(FurnitureContext context, IVnPayService vnPayService) {
            _context = context;
            _vpnPayService = vnPayService;
          
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder(Order order)
        {
            if (order.OmId == 2)
            {
                var customer = await _context.Customers.FindAsync(order.CusId);
                if (customer == null)
                {
                    return BadRequest();
                }
                var vnPay = new VnPayRequestModel
                {
                    Amount = order.TotalPrice,
                    CreatedDate = DateTime.Now,
                    FullName = customer.CusName,
                    Description = $"{customer.CusName} {customer.CusPhone}",
                    OrderId = new Random().Next(1000, 10000),
                    Order = order
                };

                var urlPayment = _vpnPayService.CreatePaymentUrl(HttpContext, vnPay);


                return Ok(new { status = true, type = "Bank", url = urlPayment });
            }
            try
            {
                order.OrderDate = DateTime.Now;
                order.OsId = 1;
                
                var result = await _context.Orders.AddAsync(order);
          
                foreach(var item in order.PscList)
                {
                   var index = _context.ProductSizeColors.SingleOrDefault(x => x.ProductId == item!.ProductId && x.ColorId == item!.ColorId && x.SizeId == item!.SizeId);
                    if(index == null)
                    {
                        return BadRequest();
                    }

                    if(item.Quantity > index.Quantity)
                    {
                        // update - show which product is not enough quantity
                        return BadRequest(new { status = false, message = $"Don't have enough quantity" }) ;
                    }

                    index.Quantity -= item.Quantity;

                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.PscId = index.PscId;
                    orderDetail.Quantity = item.Quantity;
                    orderDetail.OrderId = result.Entity.OrderId;

                    order.OrderDetails.Add(orderDetail);
                }

                await _context.OrderDetails.AddRangeAsync(order.OrderDetails);
                await _context.SaveChangesAsync();
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(new{status = true, message ="Checkout successfully", type = "Cash"});
            
        }

        // checkout with vnpay payment
        [HttpGet("paymentCallback")]
        public async Task<ActionResult> vnPayCallback()
        {
            var res = _vpnPayService.PaymentExcute(Request.Query);
            
            if (res == null || res.VnPayResponseCode != "00")
            {
               
                return Redirect("http://localhost:3000/checkout");
            }

            var order = res.Order;
            if(order == null)
            {
                return NotFound();
            }
            try
            {
                order.OrderDate = DateTime.Now;
                order.OsId = 1;

                var result = await _context.Orders.AddAsync(order);

                foreach (var item in order.PscList)
                {
                    // find productSizeColor match 
                    var index = _context.ProductSizeColors.SingleOrDefault(x => x.ProductId == item!.ProductId && x.ColorId == item!.ColorId && x.SizeId == item!.SizeId);
                    if (index == null)
                    {
                        return BadRequest();
                    }

                    if (item.Quantity > index.Quantity)
                    {

                        return BadRequest(new { status = false, message = $"Don't have enough quantity" });
                    }

                    index.Quantity -= item.Quantity;

                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.PscId = index.PscId;
                    orderDetail.Quantity = item.Quantity;
                    orderDetail.OrderId = result.Entity.OrderId;

                    order.OrderDetails.Add(orderDetail);
                }

                await _context.OrderDetails.AddRangeAsync(order.OrderDetails);
                await _context.SaveChangesAsync();

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

            return Redirect("http://localhost:3000/checkout");
        }
    }
}

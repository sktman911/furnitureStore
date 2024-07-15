using FurnitureAPI.Config;
using FurnitureAPI.Models;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.Services;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Http;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            return await _context.Orders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(x => x.OrderId == id);
            if(order == null)
            {
                return NotFound();
            }

            var orderMethod = await _context.OrderMethods.SingleOrDefaultAsync(x => x.OmId == order.OmId);
            var orderStatus = await _context.OrderStatuses.SingleOrDefaultAsync(x => x.OsId == order.OsId);

            OrderInfo result = new OrderInfo
            {
                OrderId = order.OrderId,
                OrderDate = order.OrderDate,
                TotalPrice = order.TotalPrice,
                TotalQuantity = order.TotalQuantity,
                OrderMethodName = orderMethod!.OmName,
                OrderStatusName = orderStatus!.OsName,
            };
            return result;
        }

        [HttpGet("customer/getOrders/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCustomer(int id)
        {
            var result = _context.Orders.Where(x => x.CusId == id).ToListAsync();
            return await result;
        }

        [HttpPost]
        //[DisableCors]
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
                        return BadRequest(new { status = false, message = $"Error" });
                    }

                    if (item.Quantity > index.Quantity)
                    {
                        // update - show which product is not enough quantity
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
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
            return Ok(new { status = true, url = "/paymentReturn?success=true", type = "Cash" });

        }

        

        // checkout with vnpay payment
        [HttpGet("paymentCallback")]
        public async Task<ActionResult> vnPayCallback()
        {
            var res = _vpnPayService.PaymentExcute(Request.Query);
            
            if (res == null || res.VnPayResponseCode != "00")
            {              
                return Redirect("http://localhost:3000/paymentReturn?success=false");
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

       
            return Redirect("http://localhost:3000/paymentReturn?success=true");
        }

        //update order status
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderStatus(int id)
        {
            try
            {
                var order = await _context.Orders.SingleOrDefaultAsync(x => x.OrderId == id);
                if(order == null)
                {
                    return NotFound();
                }
                order.OsId = 2;                
                await _context.SaveChangesAsync();
                return Ok(order);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }           
        }
    }
}

using FurnitureAPI.Config;
using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly PaymentURL _paymentURL;

        public OrdersController(FurnitureContext context, IUnitOfWork unitOfWork, PaymentURL paymentURL) {
            _context = context;
            _unitOfWork = unitOfWork;
            _paymentURL = paymentURL;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _unitOfWork.Orders.GetAll();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _unitOfWork.Orders.GetById(id);
            if(order == null)
            {
                return NotFound();
            }      
            return order;
        }

        [HttpGet("customer/getOrders/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCustomer(int id)
        {
            var result = await _unitOfWork.Orders.GetOrdersByCustomer(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder(Order order)
        {
            if(order.CusId == null)
            {
                return BadRequest("Invalid customer");
            }

            try
            {

                var customer = await _unitOfWork.Customers.GetById((int)order.CusId);
                if(customer == null){
                    return BadRequest();
                }


                if (order.OmId != 1)
                {
                    var urlPayment = _paymentURL.CreatePaymentURL(HttpContext, order, customer);
                    if(urlPayment == null)
                    {
                        return BadRequest(new { status = false, type = "Bank", url = urlPayment });
                    }
                    return Ok(new { status = true, type = "Bank", url = urlPayment });
                }

                var newOrder = await _unitOfWork.Orders.Add(order);

                var listOrderDetail = _unitOfWork.OrderDetails.AddListOrderDetail(order);
                if(listOrderDetail == null)
                {
                     return BadRequest(new { status = false, message = $"Error" });
                }

                if (listOrderDetail.Result.Count() == 0)
                {
                     // update - show which product is not enough quantity
                     return BadRequest(new { status = false, message = $"Don't have enough quantity" });
                }
                return Ok(new { status = true, url = "/paymentReturn?success=true", type = "Cash" });
            }
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
            

        }

        

        //update order status
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderStatus(int id)
        {
            try
            {
                var updatedOrder = await _unitOfWork.Orders.UpdateStatus(id);
                if(updatedOrder == null)
                {
                    return NotFound();
                }
                return Ok(updatedOrder);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }           
        }

        //if (order.OmId == 2)
        //{
        //    var vnPay = new VnPayRequestModel
        //    {
        //        Amount = order.TotalPrice,
        //        CreatedDate = DateTime.Now,
        //        FullName = customer.CusName,
        //        Description = $"{customer.CusName} {customer.CusPhone}",
        //        OrderId = new Random().Next(1000, 10000),
        //        Order = order
        //    };

        //    var urlPayment = _vpnPayService.CreatePaymentUrl(HttpContext, vnPay);

        //    return Ok(new { status = true, type = "Bank", url = urlPayment });

        //}
        //else if (order.OmId == 3)
        //{
        //    var urlPayment = String.Empty;
        //    try
        //    {
        //        var momoPay = new MomoOTRequestModel
        //        {
        //            Amount = (long)order!.TotalPrice!,
        //            OrderId = new Random().Next(1000, 10000).ToString(),
        //            OrderInfo = "Momo payment",
        //            Order = order,
        //        };
        //        urlPayment = _momoService.CreatePaymentUrl(HttpContext, momoPay);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }                                            

        //    return Ok(new { status = true, type = "Bank", url = urlPayment });
        //}
    }
}

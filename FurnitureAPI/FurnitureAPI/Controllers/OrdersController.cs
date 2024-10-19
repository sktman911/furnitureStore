using FurnitureAPI.Config;
using FurnitureAPI.Helpers;
using FurnitureAPI.Hubs;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.Respository;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
        private readonly PaymentURL _paymentURL;
        private readonly IOrderService _orderService;
        private readonly ICustomerService _customerService;
        private readonly IHubContext<OrderHub> _hubContext;

        public OrdersController( PaymentURL paymentURL, IOrderService orderService, ICustomerService customerService, IHubContext<OrderHub> hubContext) {
            _paymentURL = paymentURL;
            _orderService = orderService;
            _customerService = customerService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderById(id);
            if(order == null)
            {
                return NotFound();
            }      
            return order;
        }

        [HttpGet("customer/getOrders/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCustomer(int id)
        {
            var result = await _orderService.GetOrdersByCustomerId(id);
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

                var customer = await _customerService.GetCustomerById((int)order.CusId!);
                var urlPayment = _paymentURL.PaymentProcess(HttpContext, order,customer!);
                
                if (urlPayment != String.Empty && urlPayment != null)
                {
                    return Ok(new { status = true, type = "Bank", url = urlPayment });
                }
                else if (urlPayment == String.Empty)
                {
                    return BadRequest(new { status = false, type = "Bank" });
                }

                await _orderService.AddOrder(order);
                return Ok(new { status = true, url = "/paymentReturn?success=true", type = "Cash" });
            }
            catch (BadHttpRequestException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception e)
            {
               return BadRequest(e.Message);
            }
            
        }

        

        //update order status
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderStatus(int id, Order order)
        {
            try
            {
                await _orderService.UpdateOrder(id, order);
                var updatedOrder = await GetOrder(id);

                await _hubContext.Clients.All.SendAsync("ReceiveUpdateOrderStatus", updatedOrder.Value);
                return Ok(updatedOrder.Value);
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

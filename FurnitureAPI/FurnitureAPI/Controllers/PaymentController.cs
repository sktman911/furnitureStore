using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IMomoService _momoService;
        private readonly IVnPayService _vpnPayService;
        private readonly IOrderService _orderService;

        public PaymentController(IMomoService momoService, IVnPayService vnPayService, IOrderService orderService)
        {
            _momoService = momoService;
            _vpnPayService = vnPayService;
            _orderService = orderService;
        }

        [HttpGet("momoReturn")]
        public async Task<ActionResult> MomoPaymentReturn()
        {
            var res = _momoService.PaymentExcute(Request.Query);
            if (res.ResultCode == null || res == null)
            {
                return Redirect("https://furniturestore-fct8.onrender.com/paymentReturn?success=false");
            }
            try
            {
                var order = MomoService.GetOrder();
                await _orderService.AddOrder(order);
                return Redirect("https://furniturestore-fct8.onrender.com/paymentReturn?success=true");
            }
            catch (BadHttpRequestException e)
            {
                return StatusCode(e.StatusCode, e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }          
        }


        // checkout with vnpay payment
        [HttpGet("vnpayReturn")]
        public async Task<ActionResult> VnpayPaymentReturn()
        {
            var res = _vpnPayService.PaymentExcute(Request.Query);

            if (res == null || res.VnPayResponseCode != "00")
            {
                return Redirect("https://furniturestore-fct8.onrender.com/paymentReturn?success=false");
            }
       
            try
            {
                var order = res.Order;
                await _orderService.AddOrder(order!);
                return Redirect("https://furniturestore-fct8.onrender.com/paymentReturn?success=true");
            }
            catch (BadHttpRequestException e)
            {
                return StatusCode(e.StatusCode, e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}

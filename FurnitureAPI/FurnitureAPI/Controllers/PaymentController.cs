using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
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
        private readonly IUnitOfWork _unitOfWork;

        public PaymentController(IMomoService momoService, IVnPayService vnPayService, IUnitOfWork unitOfWork)
        {
            _momoService = momoService;
            _vpnPayService = vnPayService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("momoReturn")]
        public async Task<ActionResult> MomoPaymentReturn()
        {
            var res = _momoService.PaymentExcute(Request.Query);
            if (res.ResultCode == null || res == null)
            {
                return Redirect("http://localhost:3000/paymentReturn?success=false");
            }

            var order = MomoService.GetOrder();
            try
            {
                var addedOrder = await _unitOfWork.Orders.Add(order);
                var listOrderDetail = await _unitOfWork.OrderDetails.AddListOrderDetail(order);
                if(listOrderDetail.Count() == 0)
                {
                    return BadRequest("Don't have enough quantity");
                }
                if(listOrderDetail == null)
                {
                    return NotFound();
                }
                return Redirect("http://localhost:3000/paymentReturn?success=true");
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
                return Redirect("http://localhost:3000/paymentReturn?success=false");
            }

            var order = res.Order;
            if (order == null)
            {
                return NotFound();
            }
            try
            {
                var addedOrder = await _unitOfWork.Orders.Add(order);
                var listOrderDetail = await _unitOfWork.OrderDetails.AddListOrderDetail(order);
                if (listOrderDetail.Count() == 0)
                {
                    return BadRequest("Don't have enough quantity");
                }
                if (listOrderDetail == null)
                {
                    return NotFound();
                }
                return Redirect("http://localhost:3000/paymentReturn?success=true");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

    }
}

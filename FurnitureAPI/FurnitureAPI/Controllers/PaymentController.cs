using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Services.Momo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly FurnitureContext _context;
        private readonly IMomoService _momoService;

        public PaymentController(FurnitureContext context, IMomoService momoService)
        {
            _context = context;
            _momoService = momoService;
        }

        [HttpGet("momoReturn")]
        public async Task<ActionResult> MomoPaymentReturn()
        {
            var res = _momoService.PaymentExcute(Request.Query);
            if (res.ResultCode != "0" || res == null)
            {
                return Redirect("http://localhost:3000/paymentReturn?success=false");
            }

            return Redirect("http://localhost:3000/paymentReturn?success=true");
        }
    }
}

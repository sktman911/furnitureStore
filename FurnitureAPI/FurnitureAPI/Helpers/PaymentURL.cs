using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Helpers
{
    public class PaymentURL
    {
        private readonly IMomoService _momoService;
        private readonly IVnPayService _vnPayService;
        public PaymentURL(IMomoService momoService, IVnPayService vnPayService)
        {
            _momoService = momoService;
            _vnPayService = vnPayService;
        }

        public string CreatePaymentURL(HttpContext context, Order order, Customer customer)
        {
            string result = String.Empty;
            if (order.OmId == 2)
            {
                var vnPay = new VnPayRequestModel
                {
                    Amount = order.TotalPrice,
                    CreatedDate = DateTime.Now,
                    FullName = customer.CusName,
                    Description = $"{customer.CusName} {customer.CusPhone}",
                    OrderId = new Random().Next(1000, 10000),
                    Order = order
                };
                return result = _vnPayService.CreatePaymentUrl(context, vnPay);
            }
            else if(order.OmId == 3)
            {
                var momoPay = new MomoOTRequestModel
                {
                    Amount = (long)order!.TotalPrice!,
                    OrderId = new Random().Next(1000, 10000).ToString(),
                    OrderInfo = "Momo payment",
                    Order = order,
                };
                return result = _momoService.CreatePaymentUrl(context, momoPay);
            }
            return result;
        }
    }
}

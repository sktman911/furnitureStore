using FurnitureAPI.Controllers;
using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;
using Newtonsoft.Json;

namespace FurnitureAPI.Services.Momo
{
    public class MomoService : IMomoService
    {
        private readonly IConfiguration _configuration;
        private static Order _order = new Order();

        public MomoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreatePaymentUrl(HttpContext context, MomoOTRequestModel momoOTRequestModel)
        {
            string paymentUrl = string.Empty;
            var requestId = new Random().Next(100, 1000).ToString();
            var momoOTPRequest = new MomoOTRequestModel(_configuration["Momo:PartnerCode"], requestId, momoOTRequestModel.Amount, momoOTRequestModel!.OrderId!, momoOTRequestModel!.OrderInfo!, 
                _configuration["Momo:ReturnUrl"], _configuration["Momo:IpnUrl"], String.Empty, 1, momoOTRequestModel.Order!);
            momoOTPRequest.CreateSignature(_configuration["Momo:AccessKey"], _configuration["Momo:SecretKey"]);
            (bool momoLinkResult, string? message) = momoOTPRequest.GetLink(_configuration["Momo:PaymentUrl"]);
            if (momoLinkResult)
            {
                SetOrder(momoOTRequestModel.Order!);
                paymentUrl = message!;
            }
            else
            {
                // handle cannot get link
                paymentUrl = string.Empty;
            }
            return paymentUrl;
        }

        public MomoRequestResultModel PaymentExcute(IQueryCollection collections)
        {
            MomoRequestResultModel momoRequestResultModel = new MomoRequestResultModel();
            momoRequestResultModel.PartnerCode = collections.FirstOrDefault(p => p.Key == "partnerCode").Value;
            momoRequestResultModel.RequestId = collections.FirstOrDefault(p => p.Key == "requestId").Value;
            momoRequestResultModel.ResponseTime = Convert.ToInt64(collections.FirstOrDefault(p => p.Key == "responseTime").Value);
            momoRequestResultModel.ResultCode = collections.FirstOrDefault(p => p.Key == "resultCode").Value;
            momoRequestResultModel.Message = collections.FirstOrDefault(p => p.Key == "message").Value;
            momoRequestResultModel.OrderId = collections.FirstOrDefault(p => p.Key == "orderId").Value;
            momoRequestResultModel.OrderInfo = collections.FirstOrDefault(p => p.Key == "orderInfo").Value;
            momoRequestResultModel.Amount =Convert.ToInt64(collections.FirstOrDefault(p => p.Key == "amount").Value);
            momoRequestResultModel.Signature = collections.FirstOrDefault(p => p.Key == "signature").Value;
            momoRequestResultModel.TransId = collections.FirstOrDefault(p => p.Key == "transId").Value;
            momoRequestResultModel.ExtraData = collections.FirstOrDefault(p => p.Key == "extraData").Value;
            momoRequestResultModel.OrderType = collections.FirstOrDefault(p => p.Key == "orderType").Value;
            momoRequestResultModel.PayType = collections.FirstOrDefault(p => p.Key == "payType").Value;

            var order = GetOrder();

            bool checkSignature = momoRequestResultModel.ValidateSignature(_configuration["Momo:AccessKey"], _configuration["Momo:SecretKey"]);

            if (momoRequestResultModel.ResultCode != "0" || !checkSignature)
            {
                return new MomoRequestResultModel()
                {
                    Message = "Fail",
                };
            }

            return momoRequestResultModel;

        }

        public void SetOrder(Order order)
        {
            _order = order;
        }

        public static Order GetOrder()
        {
            return _order;
        }

    }
}










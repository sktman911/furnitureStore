using FurnitureAPI.Helpers;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;

namespace FurnitureAPI.Services.Momo
{
    public class MomoService : IMomoService
    {
        private readonly IConfiguration _configuration;
        public MomoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreatePaymentUrl(HttpContext context, MomoOTRequestModel momoOTRequestModel)
        {
            string paymentUrl = string.Empty;
            var requestId = new Random().Next(100, 1000).ToString();
            var momoOTPRequest = new MomoOTRequestModel(_configuration["Momo:PartnerCode"], requestId, momoOTRequestModel.Amount, momoOTRequestModel!.OrderId!, momoOTRequestModel!.OrderInfo!, 
                _configuration["Momo:ReturnUrl"], _configuration["Momo:IpnUrl"], String.Empty, 1, momoOTRequestModel.Items);
            momoOTPRequest.CreateSignature(_configuration["Momo:AccessKey"], _configuration["Momo:SecretKey"]);
            (bool momoLinkResult, string? message) = momoOTPRequest.GetLink(_configuration["Momo:PaymentUrl"]);
            if (momoLinkResult)
            {
                paymentUrl = message!;
            }
            else
            {
                // handle cannot get link
                paymentUrl = string.Empty;
            }
            return paymentUrl;
        }

        public MomoOTResponseModel PaymentExcute(IQueryCollection collections)
        {
            var partnerCode = collections.FirstOrDefault(p => p.Key == "partnerCode").Value;
            var requestId = collections.FirstOrDefault(p => p.Key == "requestId").Value;
            var responseTime = collections.FirstOrDefault(p => p.Key == "responseTime").Value;
            var resultCode = collections.FirstOrDefault(p => p.Key == "resultCode").Value;
            var message = collections.FirstOrDefault(p => p.Key == "message").Value;
            var orderId = collections.FirstOrDefault(p => p.Key == "orderId").Value;

            if (resultCode != "0")
            {
                return new MomoOTResponseModel()
                {
                    ResultCode = resultCode,
                    Message = message,
                };
            }

            return new MomoOTResponseModel()
            {
                PartnerCode = partnerCode,
                RequestId = requestId,
                ResponseTime =  Convert.ToInt64(responseTime.ToString()),
                OrderId = orderId,
                ResultCode = resultCode,
                Message = message,
            }; ;

        }

    }
}










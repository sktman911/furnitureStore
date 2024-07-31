using FurnitureAPI.Helpers;
using FurnitureAPI.TempModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NuGet.Packaging.Signing;
using System.Collections;
using System.Net.Http;
using System.Text;

namespace FurnitureAPI.Models.MomoModel
{
    public class MomoOTRequestModel
    {

        public string? PartnerCode { get; set; }

        public string? RequestId { get; set; }

        public long Amount { get; set; }

        public string? OrderId { get; set; }

        public string? OrderInfo { get; set; }

        public string? RedirectUrl { get; set; }

        public string? IpnUrl { get; set; }

        public string? RequestType { get; set; }

        public string? ExtraData { get; set; }

        public int OrderExpireTime { get; set; }

        public List<MomoRequestInfo.MomoItem>? Items { get; set; }

        public string? Lang { get; set; }

        public string? Signature { get; set; }

        public MomoOTRequestModel() { }


        public MomoOTRequestModel(string partnerCode, string requestId,
            long amount, string orderId, string orderInfo, string redirectUrl,
            string ipnUrl,  string extraData, int orderExpireTime, List<MomoRequestInfo.MomoItem>? items, string requestType = "payWithMethod", string lang = "vi")
        {
            PartnerCode = partnerCode;
            RequestId = requestId;
            Amount = amount;
            OrderId = orderId;
            OrderInfo = orderInfo;
            RedirectUrl = redirectUrl;
            IpnUrl = ipnUrl;
            RequestType = requestType;
            ExtraData = extraData;          
            OrderExpireTime = orderExpireTime;
            Items = Items;
            Lang = lang;
        }

        public void CreateSignature(string accessKey, string secretKey)
        {
            var rawData = "accessKey=" + accessKey +
                "&amount=" + Amount +
                "&extraData=" + ExtraData +
                "&ipnUrl=" + IpnUrl +
                "&orderId=" + OrderId +
                "&orderInfo=" + OrderInfo +
                "&partnerCode=" + PartnerCode +
                "&redirectUrl=" + RedirectUrl +
                "&requestId=" + RequestId +
                "&requestType=" + RequestType;
            Signature = HashHelper.HmacSHA256(rawData, secretKey);
        }

        public (bool, string?) GetLink(string paymentUrl)
        {
            using HttpClient httpClient = new HttpClient();
            var requestData = JsonConvert.SerializeObject(this, new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                Formatting = Formatting.Indented,
            });

            var requestBody = new StringContent(requestData, Encoding.UTF8, "application/json");

            var paymentLinkResponse = httpClient.PostAsync(paymentUrl, requestBody).Result;

            if (paymentLinkResponse.IsSuccessStatusCode)
            {
                var responseContent = paymentLinkResponse.Content.ReadAsStringAsync().Result;
                var responseData = JsonConvert.DeserializeObject<MomoOTResponseModel>(responseContent);
                if (responseData!.ResultCode == "0")
                {
                    return (true, responseData.PayUrl);
                }
                else
                {
                    return (false, responseData.Message);
                }
            }
            else
            {
                return (false, paymentLinkResponse.ReasonPhrase);
            }
        }
    }
}

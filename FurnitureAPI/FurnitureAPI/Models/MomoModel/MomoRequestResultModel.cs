using FurnitureAPI.Helpers;

namespace FurnitureAPI.Models.MomoModel
{
    public class MomoRequestResultModel
    {
        public string? PartnerCode { get; set; }

        public string? OrderId { get; set; }

        public string? Message { get; set; }

        public string? RequestId { get; set; }

        public long Amount { get; set; }

        public string? OrderInfo { get; set; }

        public string? OrderType { get; set; }

        public string? TransId { get; set; }

        public string? ResultCode { get; set; }

        public string? PayType { get; set; }

        public long ResponseTime { get; set; }

        public string? ExtraData { get; set; }

        public string? Signature { get; set; }

        public bool ValidateSignature(string accessKey, string secretKey)
        {
            var rawData = "accessKey=" + accessKey +
               "&amount=" + Amount +
               "&extraData=" + ExtraData +
               "&message=" + Message +
               "&orderId=" + OrderId +
               "&orderInfo=" + OrderInfo +
               "&orderType=" + OrderType +
               "&partnerCode=" + PartnerCode +
               "&payType=" + PayType +
               "&requestId=" + RequestId +
               "&responseTime=" + ResponseTime +
               "&resultCode=" + ResultCode +
               "&transId=" + TransId;
            var checkSignature = HashHelper.HmacSHA256(rawData, secretKey);
            return Signature.Equals(checkSignature);
        } 
    }
}

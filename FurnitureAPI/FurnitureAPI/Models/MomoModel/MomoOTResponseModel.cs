namespace FurnitureAPI.Models.MomoModel
{
    public class MomoOTResponseModel
    {
        public string? PartnerCode { get; set; }
        
        public string? RequestId { get; set; }

        public string? OrderId { get; set; }

        public long Amount { get; set; }

        public long ResponseTime { get; set; }

        public string? Message { get; set; }

        public string? ResultCode { get; set; }

        public string? PayUrl { get; set; }

        public string? DeepLink { get; set; }

        public string? QrCodeUrl { get; set; }
    }
}

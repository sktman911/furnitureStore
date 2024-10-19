using FurnitureAPI.Models;

namespace FurnitureAPI.TempModels
{
    public class OrderDetailInfo : OrderDetail
    {
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }

        public string? SizeName { get; set; }

        public string? ColorName { get; set; }
    }
}

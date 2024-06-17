using FurnitureAPI.Models;

namespace FurnitureAPI.TempModels
{
    public class OrderDetailInfo : OrderDetail
    {
        public string? ProductName { get; set; }

        public double? Price { get; set; }

        public string? SizeName { get; set; }

        public string? ColorName { get; set; }
    }
}

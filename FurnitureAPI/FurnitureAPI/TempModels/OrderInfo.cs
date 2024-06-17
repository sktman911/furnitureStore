using FurnitureAPI.Models;

namespace FurnitureAPI.TempModels
{
    public class OrderInfo : Order
    {

        public string? OrderMethodName { get; set; }

        public string? OrderStatusName { get; set; }

    }
}

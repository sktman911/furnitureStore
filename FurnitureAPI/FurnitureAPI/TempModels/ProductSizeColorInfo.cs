using FurnitureAPI.Models;

namespace FurnitureAPI.TempModels
{
    public class ProductSizeColorInfo : ProductSizeColor
    {
        public string? ColorName { get; set; }

        public string? ColorHexcode { get; set; }

        public string? SizeName { get; set; }
    }
}

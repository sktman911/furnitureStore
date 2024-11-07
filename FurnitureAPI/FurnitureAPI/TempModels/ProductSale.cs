namespace FurnitureAPI.TempModels
{
    public class ProductSale
    {
        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        public double? Price { get; set; }

        public string? ImageSrc { get; set; }

        public bool? Status { get; set; }

        public int? TotalSoldQuantity { get; set; }
    }
}

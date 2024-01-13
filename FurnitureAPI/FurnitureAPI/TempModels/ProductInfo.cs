using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureAPI.TempModels
{
    public class ProductInfo
    {
        public int ProductId { get; set; } 

        public string? ProductName { get; set; }

        public double? Price { get; set; }

        public int? SubCategoryId { get; set; }

        public string? SubCategoryName { get; set; }

        public int? CategoryId { get; set; }

        public string? CategoryName { get; set; }

        [NotMapped]
        public string?  ImageLink { get; set; }


    }
}

using FurnitureAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureAPI.TempModels
{
    public class ProductInfo : Product
    {
        public string? SubCategoryName { get; set; }

        public int? CategoryId { get; set; }

        public string? CategoryName { get; set; }


    }
}

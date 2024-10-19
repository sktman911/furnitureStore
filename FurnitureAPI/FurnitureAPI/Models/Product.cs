using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureAPI.Models
{
    public partial class Product
    {
        public Product()
        {
            //OrderDetails = new HashSet<OrderDetail>();
            ProductSizeColors = new HashSet<ProductSizeColor>();
            Favourites = new HashSet<Favourite>();
            Images = new HashSet<Image>();
            Reviews = new HashSet<Review>();
        }

        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public double? Price { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public byte? Sale { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? SubCategoryId { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        public virtual SubCategory? SubCategory { get; set; }
        //public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<ProductSizeColor> ProductSizeColors { get; set; }

        public virtual ICollection<Image> Images { get; set; }

        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

    }
}

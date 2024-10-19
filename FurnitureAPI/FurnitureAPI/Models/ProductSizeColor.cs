using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureAPI.Models
{
    public partial class ProductSizeColor
    {
        public ProductSizeColor()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }
        public int PscId { get; set; }
        public int? ProductId { get; set; }
        public int? SizeId { get; set; }
        public int? ColorId { get; set; }

        public int? Quantity { get; set; }

        [NotMapped]
        public double? UnitPrice { get; set; }

        public virtual Color? Color { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Size? Size { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

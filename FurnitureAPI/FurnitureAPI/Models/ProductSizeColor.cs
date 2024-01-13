using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class ProductSizeColor
    {
        public int PscId { get; set; }
        public int? ProductId { get; set; }
        public int? SizeId { get; set; }
        public int? ColorId { get; set; }

        public virtual Color? Color { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Size? Size { get; set; }
    }
}

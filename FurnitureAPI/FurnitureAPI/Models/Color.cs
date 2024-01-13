using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class Color
    {
        public Color()
        {
            ProductSizeColors = new HashSet<ProductSizeColor>();
        }

        public int ColorId { get; set; }
        public string? ColorName { get; set; }
        public string? ColorHexcode { get; set; }

        public virtual ICollection<ProductSizeColor> ProductSizeColors { get; set; }
    }
}

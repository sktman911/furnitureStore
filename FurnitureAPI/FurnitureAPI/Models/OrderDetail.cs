﻿using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class OrderDetail
    {
        public int OdId { get; set; }
        public int? OrderId { get; set; }
        public int? PscId { get; set; }
        public int? Quantity { get; set; }
        public bool? ReviewStatus { get; set; }
        public double? UnitPrice { get; set; }

        //public virtual Order? Order { get; set; }
        public virtual Review? Review { get; set; }
        public virtual ProductSizeColor? ProductSizeColor { get; set; }
    }
}

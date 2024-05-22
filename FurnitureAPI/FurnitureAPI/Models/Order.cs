using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureAPI.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int OrderId { get; set; }
        public double? TotalPrice { get; set; }
        public short? TotalQuantity { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? OsId { get; set; }
        public int? OmId { get; set; }
        public int? CusId { get; set; }

        [NotMapped]
        public List<ProductSizeColor> PscList { get; set; }

        public virtual Customer? Cus { get; set; }
        public virtual OrderMethod? Om { get; set; }
        public virtual OrderStatus? Os { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

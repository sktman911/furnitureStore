using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class OrderMethod
    {
        public OrderMethod()
        {
            Orders = new HashSet<Order>();
        }

        public int OmId { get; set; }
        public string? OmName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}

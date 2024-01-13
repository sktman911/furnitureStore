using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class OrderStatus
    {
        public OrderStatus()
        {
            Orders = new HashSet<Order>();
        }

        public int OsId { get; set; }
        public string? OsName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}

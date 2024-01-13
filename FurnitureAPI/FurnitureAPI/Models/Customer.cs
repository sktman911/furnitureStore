using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public int CusId { get; set; }
        public string? CusName { get; set; }
        public string? CusPhone { get; set; }
        public string? Email { get; set; }
        public string? CusAddress { get; set; }
        public DateTime? DoB { get; set; }
        public bool? Status { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}

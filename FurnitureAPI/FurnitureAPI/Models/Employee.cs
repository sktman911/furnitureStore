using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class Employee
    {
        public int EmpId { get; set; }
        public string? EmpName { get; set; }
        public string? EmpPhone { get; set; }
        public string? Email { get; set; }
        public string? EmpAddress { get; set; }
        public DateTime? DoB { get; set; }
        public bool? Status { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class Role
    {
        public Role()
        {
            Employees = new HashSet<Employee>();
            Functions = new HashSet<Function>();
        }

        public int RoleId { get; set; }
        public string? RoleName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Function> Functions { get; set; }
    }
}

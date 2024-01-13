using System;
using System.Collections.Generic;

namespace FurnitureAPI.Models
{
    public partial class Function
    {
        public int FunctionId { get; set; }
        public string? FuntionName { get; set; }
        public string? Route { get; set; }
        public string? Icon { get; set; }

        public string? FunctionTitle { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
    }
}

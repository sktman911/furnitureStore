using System.ComponentModel.DataAnnotations;

namespace FurnitureAPI.Models
{
    public class Review
    {
        public int ReviewId { get; set; }

        public string? Comment { get; set; }

        public byte? Rating { get; set; }

        public DateTime? ReviewedDate { get; set; }

        public int? CusId { get; set; }

        public int? ProductId { get; set; }
        public int? OdId { get; set; }
        public virtual Customer? Customer { get; set; }
        //public virtual Product? Product { get; set; }
        public virtual OrderDetail? OrderDetail { get; set; }

    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace FurnitureAPI.Models
{
    public class Image
    {
        public Image(){}

        public int ImageId { get; set; }

        public string? ImageSrc { get; set; }

        [NotMapped]
        public string? ImageLink { get; set; }

        public bool ImageMain { get; set; }

        [NotMapped]
        public IFormFileCollection? ImageFiles { get; set; }

        [NotMapped]
        public int[]? Ids { get; set; }

        public int ProductId { get; set; }

        public virtual Product? Product { get; set; }
    }
}

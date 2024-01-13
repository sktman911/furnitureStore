namespace FurnitureAPI.Models
{
    public class Image
    {
        public Image(){}

        public int ImageId { get; set; }

        public string? ImageSrc { get; set; }

        public bool ImageMain { get; set; }

        public int ProductId { get; set; }

        public virtual Product? Product { get; set; }
    }
}



using System.ComponentModel.DataAnnotations;

namespace FurnitureAPI.Models
{
    public class Favourite
    {
        [Key]
        public int? FavouriteId { get; set; }

        public int? CusId { get; set; }

        public int? ProductId { get; set; }

        public bool? IsFavourite { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual Product? Product { get; set; }
    }
}

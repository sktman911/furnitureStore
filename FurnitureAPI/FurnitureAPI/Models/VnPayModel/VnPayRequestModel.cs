namespace FurnitureAPI.Models.VnPayModel
{
    public class VnPayRequestModel
    {
        public string? FullName { get; set; }

        public string? Description { get; set; }
        public Order? Order { get; set; }

        public double? Amount { get; set; }

        public DateTime CreatedDate { get; set; }

        public int OrderId { get; set; }
    }
}

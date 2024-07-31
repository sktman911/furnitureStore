namespace FurnitureAPI.Models.MomoModel
{
    public class MomoRequestInfo
    {
        public class MomoItem
        {
            public string? Id { get; set; }
            public string? Name { get; set; }

            public long Price { get; set; }

            public string Currency { get; set; } = "VND";

            public int Quantity { get; set; }

            public long TotalPrice { get; set; }
        }
    }
}

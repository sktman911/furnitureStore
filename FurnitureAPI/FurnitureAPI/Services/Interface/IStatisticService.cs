using FurnitureAPI.TempModels;

namespace FurnitureAPI.Services.Interface
{
    public interface IStatisticService
    {
        Task <IEnumerable<ProductSale>> GetTotalQuantitySoldByProduct();

        Task<IEnumerable<CustomerStatistic>> GetTotalConsumeByCustomers();

        Task<IEnumerable<RevenueStatistic>> GetRevenue(int month, int year);
    }
}

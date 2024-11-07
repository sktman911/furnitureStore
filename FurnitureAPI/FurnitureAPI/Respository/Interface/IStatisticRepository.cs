using FurnitureAPI.TempModels;

namespace FurnitureAPI.Respository.Interface
{
    public interface IStatisticRepository
    {
        Task<IEnumerable<ProductSale>> GetTotalQuantitySoldByProduct();

        Task<IEnumerable<CustomerStatistic>> GetTotalConsumeByCustomers();

        Task<IEnumerable<RevenueStatistic>> GetRevenueBy(int month, int year);
    }
}

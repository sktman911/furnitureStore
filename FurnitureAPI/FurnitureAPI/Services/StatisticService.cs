using DocumentFormat.OpenXml.Office2016.Excel;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.TempModels;

namespace FurnitureAPI.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public StatisticService(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<RevenueStatistic>> GetRevenue(int month, int year)
        {
            return await _unitOfWork.Statistics.GetRevenueBy(month, year);
        }

        public async Task<IEnumerable<CustomerStatistic>> GetTotalConsumeByCustomers()
        {
            return await _unitOfWork.Statistics.GetTotalConsumeByCustomers();
        }

        public async Task<IEnumerable<ProductSale>> GetTotalQuantitySoldByProduct()
        {
           var totalQuantitySold =  await _unitOfWork.Statistics.GetTotalQuantitySoldByProduct();
            var request = _httpContextAccessor.HttpContext!.Request;

            return totalQuantitySold.Select(r => 
            new ProductSale { 
                ProductId = r.ProductId, 
                ProductName = r.ProductName,
                Price = r.Price,
                Status = r.Status,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, r.ImageSrc),
                TotalSoldQuantity = r.TotalSoldQuantity,
            })
            .ToList();
        }

    }
}

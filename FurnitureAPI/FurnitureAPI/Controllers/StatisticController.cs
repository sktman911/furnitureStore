using FurnitureAPI.Services.Interface;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;
        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("getTotalQuantitySold")]
        public async Task <IEnumerable<ProductSale>> GetTotalQuantitySold()
        {
            return await _statisticService.GetTotalQuantitySoldByProduct();
        }

        [HttpGet("getTotalConsume")]
        public async Task<IEnumerable<CustomerStatistic>> GetTotalConsumeByCustomer()
        {
            return await _statisticService.GetTotalConsumeByCustomers();
        }

        [HttpGet("getRevenue")]
        public async Task<IEnumerable<RevenueStatistic>> GetRevenue(int month, int year)
        {
            return await _statisticService.GetRevenue(month, year);
        }
    }
}

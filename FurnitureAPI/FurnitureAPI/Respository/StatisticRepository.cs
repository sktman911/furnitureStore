using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.TempModels;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class StatisticRepository : IStatisticRepository
    {
        private readonly FurnitureContext _context;

        public StatisticRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RevenueStatistic>> GetRevenueBy(int month, int year)
        {
            var result = await _context.OrderDetails
                .Join(_context.Orders, od => od.OrderId, o => o.OrderId, (od, o) => new { OrderDetail = od, Order = o })
                .Where(x => x.Order!.OrderDate!.Value.Month == month && x.Order.OrderDate.Value.Year == year)
                .GroupBy(x => x.Order!.OrderDate!.Value.Date)
                .Select(g => new RevenueStatistic {
                    Date = g.Key!,
                    Revenue = g.Sum(x => x.OrderDetail.Quantity * x.OrderDetail.UnitPrice)
                })
                .OrderBy(x => x.Date)
                .ToListAsync();
            return result;
        }

        public async Task<IEnumerable<CustomerStatistic>> GetTotalConsumeByCustomers()
        {
            var result = await _context.Customers.Join(_context.Orders, c => c.CusId, o => o.CusId, (c, o) => new { Customer = c, Order = o })
                .GroupBy(x => new { x.Customer.CusId, x.Customer.CusName, x.Customer.CusPhone })
                .Select(g => new CustomerStatistic
                {
                    CustomerId = g.Key.CusId,
                    CustomerName = g.Key.CusName,
                    CustomerPhone = g.Key.CusPhone,
                    TotalConsume = g.Sum(x => x.Order.TotalPrice)
                })
                .OrderByDescending(x => x.TotalConsume)
                .Take(5)
                .ToListAsync();
            return result;
        }

        public async Task<IEnumerable<ProductSale>> GetTotalQuantitySoldByProduct()
        {
            var totalSold = await _context.Products
                .Join(_context.ProductSizeColors, p => p.ProductId, psc => psc.ProductId, (p, psc) => new { Product = p, ProductSizeColor = psc })
                .Join(_context.OrderDetails, g => g.ProductSizeColor.PscId, od => od.PscId, (g, od) => new { g.Product, OrderDetail = od,g.ProductSizeColor })
                .Join(_context.Images.Where(i => i.ImageMain == true), g => g.Product.ProductId, i => i.ProductId, (g, i) => new{g.Product, g.OrderDetail, Image = i })
                .GroupBy(x => new { x.Product.ProductId, x.Product.ProductName, x.Product.Price,x.Product.Status, x.Image.ImageSrc })
                .Select(group => new ProductSale
                {
                    ProductId = group.Key.ProductId,
                    ProductName = group.Key.ProductName,
                    Price = group.Key.Price,
                    Status = group.Key.Status,
                    ImageSrc = group.Key.ImageSrc,
                    TotalSoldQuantity = group.Sum(p => p.OrderDetail.Quantity)
                })
                .OrderByDescending(x => x.TotalSoldQuantity)
                .Take(5)
                .ToListAsync();
            return totalSold;
        }
    }
}

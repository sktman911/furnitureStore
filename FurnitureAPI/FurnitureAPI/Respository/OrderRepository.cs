
using DocumentFormat.OpenXml.Vml.Office;
using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.TempModels;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FurnitureContext _context;

        public OrderRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders;
        }

        public async Task<Order?> GetById(int id)
        {
            var result = await (from order in _context.Orders
                                where order.OrderId == id
                                join orderDetail in _context.OrderDetails on order.OrderId equals orderDetail.OrderId
                                join productSizeColor in _context.ProductSizeColors on orderDetail.PscId equals productSizeColor.PscId
                                join product in _context.Products on productSizeColor.ProductId equals product.ProductId
                                join size in _context.Sizes on productSizeColor.SizeId equals size.SizeId
                                join color in _context.Colors on productSizeColor.ColorId equals color.ColorId
                       
                                select new OrderInfo
                                {
                                    OrderId = order.OrderId,
                                    OrderAddress = order.OrderAddress,
                                    OrderDate = order.OrderDate,
                                    TotalPrice = order.TotalPrice,
                                    TotalQuantity = order.TotalQuantity,
                                    OrderDetails = order.OrderDetails.Select(od => new OrderDetail
                                    {
                                        OdId = od.OdId,
                                        PscId = od.PscId,
                                        ReviewStatus = od.ReviewStatus,
                                        Quantity = od.Quantity,
                                        UnitPrice = od.UnitPrice,                                 
                                        ProductSizeColor = new ProductSizeColor
                                        {
                                            PscId = productSizeColor.PscId,
                                            Product = product,
                                            Size = productSizeColor.Size,
                                            Color = productSizeColor.Color
                                        },
                                    }).ToList(),
                                    OrderMethodName = order.Om!.OmName,
                                    OrderStatusName = order.Os!.OsName,
                                    OsId = order.OsId,
                                    OmId = order.OmId,
                                    OrderPhone = order.OrderPhone,
                                }).FirstOrDefaultAsync();

            return result;
        }

        public async Task<IEnumerable<Order>> GetOrdersByCustomer(int id)
        {
            var result = await _context.Orders.Where(x => x.CusId == id).ToListAsync();
            return result;
        }

        public async Task Update(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public Task Delete(Order order)
        {
            throw new NotImplementedException();
        }

        public async Task Add(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public Task<Order?> FindByName(string name)
        {
            throw new NotImplementedException();
        }

        // update later

        public async Task<OrderMethod?> GetOrderMethodByOrderId(int orderId)
        {
            var orderMethod = await _context.OrderMethods.SingleOrDefaultAsync(x => x.OmId == orderId);
            return orderMethod;
        }

        public async Task<OrderStatus?> GetOrderStatusByOrderId(int orderId)
        {
            var orderStatus = await _context.OrderStatuses.SingleOrDefaultAsync(x => x.OsId == orderId);
            return orderStatus;
        }

        // end update later
    }
}

using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.Models.MomoModel;
using FurnitureAPI.Models.VnPayModel;
using FurnitureAPI.TempModels;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FurnitureContext _context;
        private readonly PaymentURL _paymentURL;

        public OrderRepository(FurnitureContext context, PaymentURL paymentURL)
        {
            _context = context;
            _paymentURL = paymentURL;
        }

        public async Task<Order?> UpdateStatus(int id)
        {
            var existedOrder = await _context.Orders.SingleOrDefaultAsync(x => x.OrderId == id);
            if (existedOrder == null)
            {
                return null;
            }
            existedOrder.OsId = 2;
            await _context.SaveChangesAsync();
            return existedOrder;
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders;
        }

        public async Task<Order> GetById(int id)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(x => x.OrderId == id);
            if (order == null)
            {
                return null!;
            }

            var orderMethod = await _context.OrderMethods.SingleOrDefaultAsync(x => x.OmId == order.OmId);
            var orderStatus = await _context.OrderStatuses.SingleOrDefaultAsync(x => x.OsId == order.OsId);

            OrderInfo result = new OrderInfo
            {
                OrderId = order.OrderId,
                OrderDate = order.OrderDate,
                TotalPrice = order.TotalPrice,
                TotalQuantity = order.TotalQuantity,
                OrderMethodName = orderMethod!.OmName,
                OrderStatusName = orderStatus!.OsName,
            };
            return result;
        }

        public async Task<IEnumerable<Order>> GetOrdersByCustomer(int id)
        {
            var result = await _context.Orders.Where(x => x.CusId == id).ToListAsync();
            return result;
        }

        public Task<Order?> Update(int id, Order order)
        {
            throw new NotImplementedException();
        }

        public Task<Order?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Order?> Add(Order order)
        {
            order.OrderDate = DateTime.Now;
            order.OsId = 1;

            var newOrder = await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return newOrder.Entity;
        }
    }
}

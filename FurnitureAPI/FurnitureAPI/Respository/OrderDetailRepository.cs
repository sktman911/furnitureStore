using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly FurnitureContext _context;
        public OrderDetailRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDetail?>> GetOrderDetailByOrderId(int id)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(x => x.OrderId == id);
            if (order == null)
            {
                return null!;
            }

            List<OrderDetailInfo> list = new List<OrderDetailInfo>();
            var orderDetail = await _context.OrderDetails.Where(x => x.OrderId == order.OrderId).ToListAsync();
            foreach (var item in orderDetail)
            {
                var productSizeColor = await _context.ProductSizeColors.SingleOrDefaultAsync(x => x.PscId == item.PscId);
                var product = await _context.Products.SingleOrDefaultAsync(y => y.ProductId == productSizeColor!.ProductId);
                var size = await _context.Sizes.SingleOrDefaultAsync(y => y.SizeId == productSizeColor!.SizeId);
                var color = await _context.Colors.SingleOrDefaultAsync(y => y.ColorId == productSizeColor!.ColorId);

                var orderDetailInfo = new OrderDetailInfo
                {
                    OdId = item.OdId,
                    OrderId = item.OrderId,
                    Quantity = item.Quantity,
                    ProductName = product!.ProductName,
                    Price = product!.Price,
                    SizeName = size!.SizeName,
                    ColorName = color!.ColorName,
                };
                list.Add(orderDetailInfo);
            }

            return list;
        }
        public async Task<IEnumerable<OrderDetail>> AddListOrderDetail(Order order)
        {
            var list = new List<OrderDetail>();
            foreach (var item in order.PscList)
            {
                var productSizeColor = _context.ProductSizeColors.SingleOrDefault(x => x.ProductId == item!.ProductId && x.ColorId == item!.ColorId && x.SizeId == item!.SizeId);
                if (productSizeColor == null)
                {
                    return null!;
                }

                if (item.Quantity > productSizeColor.Quantity)
                {
                    // hanlde if quantity invalid
                    list.Clear();
                    return list;
                }

                productSizeColor.Quantity -= item.Quantity;

                OrderDetail orderDetail = new OrderDetail();
                orderDetail.PscId = productSizeColor.PscId;
                orderDetail.Quantity = item.Quantity;
                orderDetail.OrderId = order!.OrderId;

                list.Add(orderDetail);
            }

            await _context.OrderDetails.AddRangeAsync(list);
            await _context.SaveChangesAsync();
            return list;
        }


        public Task<OrderDetail?> Add(OrderDetail entity)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderDetail>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail?> Update(int id, OrderDetail entity)
        {
            throw new NotImplementedException();
        }
    }
}

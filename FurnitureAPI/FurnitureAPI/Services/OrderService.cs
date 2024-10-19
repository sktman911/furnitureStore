using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PaymentURL _paymentURL;

        public OrderService(IUnitOfWork unitOfWork, PaymentURL paymentURL)
        {
            _unitOfWork = unitOfWork;
            _paymentURL = paymentURL;
        }
        public async Task AddOrder(Order order)
        {           
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                order.OrderDate = DateTime.Now;
                order.OsId = 1;
                await _unitOfWork.Orders.Add(order);
                await _unitOfWork.SaveChangesAsync();

                var list = new List<OrderDetail>();
                foreach (var item in order.PscList!)
                {
                    var productSizeColor = await _unitOfWork.ProductSizeColors.GetById(item.ProductId, item.SizeId, item.ColorId);
                    if (productSizeColor == null)
                    {
                        throw new BadHttpRequestException("Not found product detail", StatusCodes.Status404NotFound);
                    }

                    if (item.Quantity > productSizeColor.Quantity)
                    {
                        // hanlde if quantity invalid
                        throw new BadHttpRequestException("Not enough quantity", StatusCodes.Status400BadRequest);
                    }

                    productSizeColor.Quantity -= item.Quantity;

                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.PscId = productSizeColor.PscId;
                    orderDetail.Quantity = item.Quantity;
                    orderDetail.OrderId = order!.OrderId;
                    orderDetail.UnitPrice =item.UnitPrice;

                    list.Add(orderDetail);
                }
                await _unitOfWork.OrderDetails.AddListOrderDetail(list);
                await _unitOfWork.CommitAsync();
            }
            catch (Exception)
            {           
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }

        public Task DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            var orders = await _unitOfWork.Orders.GetAll();
            return orders;
        }

        public async Task<Order?> GetOrderById(int id)
        {
            var order = await _unitOfWork.Orders.GetById(id);
            if(order == null)
            {
                throw new KeyNotFoundException();
            }
            return order;
        }

        public async Task<IEnumerable<Order>> GetOrdersByCustomerId(int customerId)
        {
            var orders = await _unitOfWork.Orders.GetOrdersByCustomer(customerId);
            return orders;
        }

        public async Task UpdateOrder(int id, Order order)
        {
            var existedOrder = await _unitOfWork.Orders.GetById(id);
            if(existedOrder == null)
            {
                throw new KeyNotFoundException();
            }
            existedOrder.OsId = 2;
            await _unitOfWork.Orders.Update(id);
        }
    }
}

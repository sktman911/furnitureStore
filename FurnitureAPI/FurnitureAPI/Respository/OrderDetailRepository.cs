using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
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
            var list = await _context.OrderDetails.Where(x => x.OrderId == id).ToListAsync();
            return list;
        }
        public async Task AddListOrderDetail(List<OrderDetail> listOrderDetail)
        {
            await _context.OrderDetails.AddRangeAsync(listOrderDetail);
            await _context.SaveChangesAsync();
        }


        public Task Add(OrderDetail entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(OrderDetail orderDetail)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderDetail>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail?> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task Update(OrderDetail entity)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail?> FindByName(string name)
        {
            throw new NotImplementedException();
        }
    }
}

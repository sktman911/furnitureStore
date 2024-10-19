using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.TempModels;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderDetailService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<OrderDetail?>> GetOrderDetailByOrderId(int orderId)
        {
            var order = await _unitOfWork.Orders.GetById(orderId);
            if(order == null)
            {
                throw new KeyNotFoundException();
            }

            List<OrderDetailInfo> list = new List<OrderDetailInfo>();
            var orderDetail = await _unitOfWork.OrderDetails.GetOrderDetailByOrderId(orderId);
            foreach (var item in orderDetail)
            {
                var productSizeColor = await _unitOfWork.ProductSizeColors.GetById((int)item!.PscId!);
                var product = await _unitOfWork.Products.GetById((int)productSizeColor!.ProductId!);
                var size = await _unitOfWork.Sizes.GetById((int)productSizeColor!.SizeId!);
                var color = await _unitOfWork.Colors.GetById((int)productSizeColor!.ColorId!);

                var orderDetailInfo = new OrderDetailInfo
                {
                    OdId = item.OdId,
                    OrderId = item.OrderId,
                    Quantity = item.Quantity,
                    ProductName = product!.ProductName,
                    ProductId = product!.ProductId,
                    UnitPrice = item.UnitPrice,
                    SizeName = size!.SizeName,
                    ColorName = color!.ColorName,
                    ReviewStatus = item.ReviewStatus
                };
                list.Add(orderDetailInfo);
            }

            return list;
        }
    }
}

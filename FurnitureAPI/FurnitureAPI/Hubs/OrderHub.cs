using FurnitureAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace FurnitureAPI.Hubs
{
    public class OrderHub : Hub
    {
        public async Task UpdateOrderStatus(Order order)
        {
            await Clients.All.SendAsync("ReceiveUpdateOrderStatus", order);
        }
    }
}

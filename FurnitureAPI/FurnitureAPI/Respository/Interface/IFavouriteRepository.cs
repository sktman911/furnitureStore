using FurnitureAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository.Interface
{
    public interface IFavouriteRepository : IGenericRepository<Favourite>
    {
        Task<IEnumerable<Favourite>> GetFavouritesByCustomerId(int customerId);
        Task<Favourite?> GetById(int? customerId, int? productId);
    }
}

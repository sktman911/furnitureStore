using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IFavouriteService
    {
        Task<IEnumerable<Favourite>> GetFavouritesByCustomer(int customerId);
        Task<Favourite> GetFavourite(int customerId, int productId);
        Task AddFavourite(Favourite favourite);
        Task UpdateFavourite(int id, Favourite favourite);
    }
}

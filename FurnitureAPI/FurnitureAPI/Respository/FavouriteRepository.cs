using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class FavouriteRepository : IFavouriteRepository
    {
        private readonly FurnitureContext _context;
        public FavouriteRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task Add(Favourite entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task Delete(Favourite entity)
        {
            throw new NotImplementedException();
        }

        public Task<Favourite?> FindByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Favourite>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Favourite?> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Favourite?> GetById(int? customerId, int? productId)
        {
            var favourite = await _context.Favourites.SingleOrDefaultAsync( x=>x.CusId == customerId && x.ProductId == productId);
            return favourite;
        }

        public async Task<IEnumerable<Favourite>> GetFavouritesByCustomerId(int customerId)
        {
            return await _context.Favourites.Where(x => x.CusId == customerId).ToListAsync();
        }

        public async Task Update(Favourite entity)
        {
            await _context.SaveChangesAsync();
        }
    }
}

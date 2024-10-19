using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;

namespace FurnitureAPI.Services
{
    public class FavouriteService : IFavouriteService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FavouriteService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddFavourite(Favourite favourite)
        {
            favourite.FavouriteId = null;
            await _unitOfWork.Favourites.Add(favourite);
        }

        public async Task<Favourite> GetFavourite(int customerId, int productId)
        {
            var favourite = await _unitOfWork.Favourites.GetById(customerId, productId);
            return favourite!;
        }

        public async Task<IEnumerable<Favourite>> GetFavouritesByCustomer(int customerId)
        {
            return await _unitOfWork.Favourites.GetFavouritesByCustomerId(customerId);
        }

        public async Task UpdateFavourite(int id, Favourite favourite)
        {
            var existedFavourite = await _unitOfWork.Favourites.GetById(favourite.CusId, favourite.ProductId);
            if (existedFavourite == null)
            {
                throw new BadHttpRequestException("Not found", StatusCodes.Status404NotFound);
            }

            existedFavourite.CusId = favourite.CusId;
            existedFavourite.ProductId = favourite.ProductId;
            existedFavourite.IsFavourite = !favourite.IsFavourite;

            await _unitOfWork.Favourites.Update(favourite);
        }
    }
}




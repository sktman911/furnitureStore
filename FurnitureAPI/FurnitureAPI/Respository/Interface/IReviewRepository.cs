using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IReviewRepository : IGenericRepository<Review>
    {
        Task<IEnumerable<Review>> GetReviewsByProduct(int? productId);   
    }
}

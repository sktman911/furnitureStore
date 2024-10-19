using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface IReviewService
    {
        Task<IEnumerable<Review>> GetReviewsByProduct(int productId);

        Task AddReview(Review review);
    }
}

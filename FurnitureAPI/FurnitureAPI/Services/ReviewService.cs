using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;

namespace FurnitureAPI.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReviewService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddReview(Review review)
        {
            review.ReviewedDate = DateTime.Now;
            await _unitOfWork.Reviews.Add(review);
        }

        public async Task<IEnumerable<Review>> GetReviewsByProduct(int productId)
        {
            return await _unitOfWork.Reviews.GetReviewsByProduct(productId);
        }
    }
}

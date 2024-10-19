using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly FurnitureContext _context;
        public ReviewRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task Add(Review entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task Delete(Review entity)
        {
            throw new NotImplementedException();
        }

        public Task<Review?> FindByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Review>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Review?> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Review>> GetReviewsByProduct(int? productId)
        {
            var reviews = await _context.Reviews.Join(_context.Customers,r => r.CusId, c =>  c.CusId, (r, c) => new {Customer = c, Review = r})
                .Where(x => x.Review.ProductId == productId).Select(s => new Review
            {
                ReviewId = s.Review.ReviewId,
                ReviewedDate = s.Review.ReviewedDate,
                Comment = s.Review.Comment,
                OdId = s.Review.OdId,
                CusId = s.Review.CusId,
                Rating = s.Review.Rating,
                ProductId = s.Review.ProductId,
                Customer = s.Customer
            }).ToListAsync();
            return reviews;
        }

        public Task Update(Review entity)
        {
            throw new NotImplementedException();
        }
    }
}

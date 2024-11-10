using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using Microsoft.EntityFrameworkCore.Storage;

namespace FurnitureAPI.Respository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FurnitureContext _context;
        private IDbContextTransaction? _transaction;

        public ICategoryRespository Categories { get; private set; }
        public ISubCategoryRepository SubCategories { get; private set; }
        public IColorRepository Colors { get; private set; }
        public ISizeRepository Sizes { get; private set; }
        public ICustomerRepository Customers { get; private set; }
        public IProductRepository Products { get; private set; }
        public IProductSizeColorRepository ProductSizeColors { get; private set; }
        public IOrderRepository Orders { get; private set; }
        public IOrderDetailRepository OrderDetails { get; private set; }
        public IImageRepository Images { get; private set; }
        public IFunctionRepository Functions { get; private set; }
        public IFavouriteRepository Favourites { get; private set; }
        public IReviewRepository Reviews { get; private set; }
        public IStatisticRepository Statistics { get; private set; }

        public UnitOfWork(FurnitureContext context)
        {
            _context = context;

            Categories = new CategoryRespository(_context);
            SubCategories = new SubCategoryRepository(_context);
            Colors =  new ColorRepository(_context);
            Sizes =  new SizeRepository(_context);
            Customers =  new CustomerRepository(_context);
            Products =  new ProductRepository(_context);
            ProductSizeColors = new ProductSizeColorRepository(_context);
            Orders = new OrderRepository(_context);
            OrderDetails = new OrderDetailRepository(_context);
            Images =  new ImageRepository(_context);
            Functions = new FunctionRepository(_context);
            Favourites =  new FavouriteRepository(_context);
            Reviews =  new ReviewRepository(_context);
            Statistics =  new StatisticRepository(_context);
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
            }
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }
    }
}

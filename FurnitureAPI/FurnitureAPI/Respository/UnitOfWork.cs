using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using Microsoft.EntityFrameworkCore.Storage;

namespace FurnitureAPI.Respository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FurnitureContext _context;
        private IDbContextTransaction? _transaction;

        private Lazy<CategoryRespository> _categories;
        private Lazy<SubCategoryRepository> _subCategories;
        private Lazy<ColorRepository> _colors;
        private Lazy<SizeRepository> _sizes;
        private Lazy<CustomerRepository> _customers;
        private Lazy<ProductRepository> _products;
        private Lazy<ProductSizeColorRepository> _productSizeColors;
        private Lazy<OrderRepository> _orders;
        private Lazy<OrderDetailRepository> _orderDetails;
        private Lazy<ImageRepository> _images;
        private Lazy<FunctionRepository> _functions;
        private Lazy<FavouriteRepository> _favourites;
        private Lazy<ReviewRepository> _reviews;
        private Lazy<StatisticRepository> _statistics;

        public UnitOfWork(FurnitureContext context)
        {
            _context = context;

            _categories = new Lazy<CategoryRespository>(() => new CategoryRespository(_context));
            _subCategories = new Lazy<SubCategoryRepository>(() => new SubCategoryRepository(_context));
            _colors = new Lazy<ColorRepository>(() => new ColorRepository(_context));
            _sizes = new Lazy<SizeRepository>(() => new SizeRepository(_context));
            _customers = new Lazy<CustomerRepository>(() => new CustomerRepository(_context));
            _products = new Lazy<ProductRepository>(() => new ProductRepository(_context));
            _productSizeColors = new Lazy<ProductSizeColorRepository>(() => new ProductSizeColorRepository(_context));
            _orders = new Lazy<OrderRepository>(() => new OrderRepository(_context));
            _orderDetails = new Lazy<OrderDetailRepository>(() => new OrderDetailRepository(_context));
            _images = new Lazy<ImageRepository>(() => new ImageRepository(_context));
            _functions = new Lazy<FunctionRepository>(() => new FunctionRepository(_context));
            _favourites = new Lazy<FavouriteRepository>(() => new FavouriteRepository(_context));
            _reviews = new Lazy<ReviewRepository>(() => new ReviewRepository(_context));
            _statistics = new Lazy<StatisticRepository>(() => new StatisticRepository(_context));
        }
        public ICategoryRespository Categories => _categories.Value;
        public ISubCategoryRepository SubCategories => _subCategories.Value;
        public IColorRepository Colors => _colors.Value;
        public ISizeRepository Sizes => _sizes.Value;
        public ICustomerRepository Customers => _customers.Value;
        public IProductRepository Products => _products.Value;
        public IProductSizeColorRepository ProductSizeColors => _productSizeColors.Value;
        public IOrderRepository Orders => _orders.Value;
        public IOrderDetailRepository OrderDetails => _orderDetails.Value;
        public IImageRepository Images => _images.Value;
        public IFunctionRepository Functions => _functions.Value;
        public IFavouriteRepository Favourites => _favourites.Value;
        public IReviewRepository Reviews => _reviews.Value;
        public IStatisticRepository Statistics => _statistics.Value;

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

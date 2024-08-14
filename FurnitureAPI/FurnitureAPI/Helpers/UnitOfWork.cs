using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.Respository;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;

namespace FurnitureAPI.Helpers
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FurnitureContext _context;
        private readonly IConfiguration _configuration;
        private readonly HandleImage _handleImage;
        private readonly PaymentURL _paymentURL;

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

        public UnitOfWork(FurnitureContext context, IConfiguration configuration, HandleImage handleImage, PaymentURL paymentURL)
        {
            _context = context;
            _configuration = configuration;
            _handleImage = handleImage;
            _paymentURL = paymentURL;

            _categories = new Lazy<CategoryRespository>(() => new CategoryRespository(_context));
            _subCategories = new Lazy<SubCategoryRepository>(() => new SubCategoryRepository(_context));
            _colors = new Lazy<ColorRepository>(() => new ColorRepository(_context));
            _sizes = new Lazy<SizeRepository>(() => new SizeRepository(_context));
            _customers = new Lazy<CustomerRepository>(() => new CustomerRepository(_context, _configuration));
            _products = new Lazy<ProductRepository>(() => new ProductRepository(_context, _handleImage));
            _productSizeColors = new Lazy<ProductSizeColorRepository>(() => new ProductSizeColorRepository(_context));
            _orders = new Lazy<OrderRepository>(() => new OrderRepository(_context, _paymentURL));
            _orderDetails = new Lazy<OrderDetailRepository>(() => new OrderDetailRepository(_context));
            _images = new Lazy<ImageRepository>(() => new ImageRepository(_context, _handleImage));
            _functions = new Lazy<FunctionRepository>(() => new FunctionRepository(_context));
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

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}

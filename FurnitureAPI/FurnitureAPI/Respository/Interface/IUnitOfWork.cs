namespace FurnitureAPI.Respository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRespository Categories { get; }

        ISubCategoryRepository SubCategories { get; }

        IColorRepository Colors { get; }

        ISizeRepository Sizes { get; }

        ICustomerRepository Customers { get; }
        IProductRepository Products { get; }
        IProductSizeColorRepository ProductSizeColors { get; }
        IOrderRepository Orders { get; }
        IOrderDetailRepository OrderDetails { get; }
        IImageRepository Images { get; }
        IFunctionRepository Functions { get; }
        IFavouriteRepository Favourites { get; }
        IReviewRepository Reviews { get; }
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        Task SaveChangesAsync();
    }
}

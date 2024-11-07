using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace FurnitureAPI.Respository
{
    public class ProductRepository : IProductRepository
    {
        private readonly FurnitureContext _context;

        public ProductRepository(FurnitureContext context)
        {
            _context = context;
        }
        public async Task Add(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Product product)
        {
            await _context.SaveChangesAsync();
        }

        // top product client order by descending 
        public async Task<IEnumerable<Product>> GetTopProductsByDesc()
        {
            var products = await _context.Products
                .Where(p => p.Status == true && p.SubCategoryId != null &&
                p.ProductSizeColors.Any(psc => psc.ProductId == p.ProductId))
                .Include(p => p.SubCategory)
                .ThenInclude(sc => sc!.Category)
                .Include(p => p.Images)
                .Include(p => p.ProductSizeColors)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();

            return products;
        }

        // admin
        public async Task<IEnumerable<Product>> GetAllActiveProducts()
        {
            var products = await _context.Products.Include(x => x.SubCategory).Include(p => p.Images).Where(p => p.Status == true).ToListAsync();

            return products;
        }

        public async Task<Product> GetProductCustom(int id )
        {
            var product = await _context.Products.Include(p => p.Images).FirstOrDefaultAsync(p => p.ProductId == id);
            return product!;
        }

        public async Task Update(Product product)
        {
            await _context.SaveChangesAsync();
        }

        public async Task<Product?> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product;
        }

        public Task<IEnumerable<Product>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<Product?> FindByName(string name)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductName == name);
            return product;
        }

        public async Task<IEnumerable<Product>> GetFavouriteProducts(int customerId)
        {
            var products = await _context.Products
                        .Join(_context.Favourites, p => p.ProductId, f => f.ProductId, (p, f) => new { Product = p, Favourite = f })
                        .Where(x => x.Favourite.CusId == customerId && x.Favourite.IsFavourite == true)
                        .Join(_context.Images, pf => pf.Product.ProductId, i => i.ProductId, (pf, i) => new { pf.Product, Image = i })
                        .Where(x => x.Image.ImageMain == true)
                        .ToListAsync();
            return products.Select(x => x.Product);
        }

    }
}

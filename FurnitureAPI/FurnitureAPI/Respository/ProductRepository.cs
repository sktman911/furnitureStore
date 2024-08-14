using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class ProductRepository : IProductRepository
    {
        private readonly FurnitureContext _context;
        private readonly HandleImage _handleImage;

        public ProductRepository(FurnitureContext context, HandleImage handleImage)
        {
            _context = context;
            _handleImage = handleImage;
        }
        public async Task<Product?> Add([FromForm]Product product)
        {
            var existedProduct = await _context.Products.FirstOrDefaultAsync(x => x.ProductName == product.ProductName);
            if(existedProduct != null)
            {
                return null;
            }
            product.Status = true;
            product.CreatedDate = DateTime.Now;
            var newProduct =  await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            Image image = new Image();
            image.ProductId = newProduct.Entity.ProductId;
            image.ImageMain = true;
            image.ImageSrc = await _handleImage.UploadImage(product.ImageFile!);
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();

            return newProduct.Entity;
        }

        public async Task<Product?> Delete(int id)
        {
            // Xoa anh phu
            var images = _context.Images.Where(x => x.ProductId == id && x.ImageMain == false).ToList();
            foreach (var image in images)
            {
                _context.Images.Remove(image);
            }

            var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            if (product == null)
            {
                return null;
            }

            product.Status = false;
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<IEnumerable<ProductInfo>> GetTopProductsByDesc(HttpRequest request)
        {
            var products = await _context.Images
                .Where(x => x.Product!.Status == true && x.ImageMain == true && x.Product.ProductSizeColors.Any(p => p.ProductId == x.Product.ProductId))
                .OrderByDescending(x => x.Product!.CreatedDate).Take(8)
                .Select(s => new ProductInfo
                {
                    ProductId = s.ProductId,
                    ProductName = s.Product!.ProductName,
                    Price = s.Product.Price,
                    SubCategoryId = s.Product.SubCategoryId,
                    SubCategoryName = s.Product.SubCategory!.SubCategoryName,
                    CategoryId = s.Product.SubCategory.Category!.CategoryId,
                    CategoryName = s.Product.SubCategory.Category!.CategoryName,
                    Images = _context.Images.Where(x => x.ImageMain == true && x.ProductId == s.ProductId).Select(s => new Image
                    {
                        ImageId = s.ImageId,
                        ImageMain = s.ImageMain,
                        ImageSrc = s.ImageSrc,
                        ProductId = s.ProductId,
                        ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, s.ImageSrc)
                    }).ToList()
                }).ToListAsync();
            return products!;
        }

        public async Task<IEnumerable<ProductInfo>> GetAllCustom(HttpRequest request)
        {
            var products = await _context.Images
               .Where(x => x.Product!.Status == true && x.ImageMain == true)
               .Select(s => new ProductInfo
               {
                   ProductId = s.ProductId,
                   ProductName = s.Product!.ProductName,
                   Price = s.Product.Price,
                   SubCategoryId = s.Product.SubCategoryId,
                   SubCategoryName = s.Product.SubCategory!.SubCategoryName,
                   CategoryId = s.Product.SubCategory.Category!.CategoryId,
                   CategoryName = s.Product.SubCategory.Category!.CategoryName,
                   Images = _context.Images.Where(x => x.ImageMain == true && x.ProductId == s.ProductId).Select(s => new Image
                   {
                       ImageId = s.ImageId,
                       ImageMain = s.ImageMain,
                       ImageSrc = s.ImageSrc,
                       ProductId = s.ProductId,
                       ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, s.ImageSrc)
                   }).ToList()
               }).ToListAsync();
            return products!;
        }

        public async Task<ProductInfo> GetProductCustom(int id, HttpRequest request)
        {
            var product =  await _context.Images.Include(x => x.Product)
                .Where(x => x.Product!.ProductId == id)
                .Select(s => new ProductInfo
                {
                    ProductId = s.ProductId,
                    ProductName = s.Product!.ProductName,
                    Price = s.Product.Price,
                    SubCategoryId = s.Product.SubCategoryId,
                    SubCategoryName = s.Product.SubCategory!.SubCategoryName,
                    CategoryId = s.Product.SubCategory.Category!.CategoryId,
                    CategoryName = s.Product.SubCategory.Category!.CategoryName,
                    Images = _context.Images.Where(x => x.ProductId == id).Select(s => new Image
                    {
                        ImageId = s.ImageId,
                        ImageMain = s.ImageMain,
                        ImageSrc = s.ImageSrc,
                        ProductId = s.ProductId,
                        ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, s.ImageSrc)
                    }).ToList()
                }).FirstOrDefaultAsync();
            return product!;
        }

        public async Task<Product?> Update(int id, [FromForm]Product product)
        {
            var existedProduct = await _context.Products.SingleOrDefaultAsync(x => x.ProductId == id);
            if(existedProduct == null)
            {
                return null;
            }

            if (product.ImageFile != null)
            {
                var image = await _context.Images.SingleOrDefaultAsync(x => x.ImageMain == true && x.ProductId == product.ProductId);
                image!.ImageSrc = await _handleImage.UploadImage(product.ImageFile);
                await _context.SaveChangesAsync();
            }
            existedProduct.ProductName = product.ProductName;
            existedProduct.Description = product.Description;
            existedProduct.Price = product.Price;
            existedProduct.SubCategoryId = product.SubCategoryId;
            await  _context.SaveChangesAsync();
            return existedProduct;
        }

        public Task<Product> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Product>> GetAll()
        {
            throw new NotImplementedException();
        }

    }
}

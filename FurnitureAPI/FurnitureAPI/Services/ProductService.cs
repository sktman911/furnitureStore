using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2016.Excel;
using ExcelDataReader;
using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace FurnitureAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ProductService(IUnitOfWork unitOfWork, IImageService imageService, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task AddProduct([FromForm]Product product)
        {
            var existedProduct = await _unitOfWork.Products.FindByName(product.ProductName!);
            if (existedProduct != null)
            {
               throw new BadHttpRequestException("Product name has existed",StatusCodes.Status400BadRequest);
            }
            product.Status = true;
            product.CreatedDate = DateTime.Now;

            await _unitOfWork.Products.Add(product);

            if(product.ImageFile != null)
            {
                var addedProduct = await _unitOfWork.Products.FindByName(product.ProductName!);
                await _imageService.AddImageByProduct(addedProduct!.ProductId, product.ImageFile!);
            }
        }

        public async Task DeleteProduct(int id)
        {
            // Xoa anh phu
            var images = await _unitOfWork.Images.GetListById(id);
            foreach (var image in images)
            {
                await _unitOfWork.Images.Delete(image);
            }

            var product = await _unitOfWork.Products.GetById(id);
            if (product == null)
            {
                throw new BadHttpRequestException("Product is not found",StatusCodes.Status404NotFound);
            }

            product.Status = false;
            await _unitOfWork.Products.Delete(product);
        }

        public Task<IEnumerable<Product>> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetTopProducts()
        {
            var products = await _unitOfWork.Products.GetTopProductsByDesc();
            var request = _httpContextAccessor.HttpContext!.Request;

            var productInfos = products.Select(p => new ProductInfo
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                Price = p.Price,
                Description = p.Description,
                SubCategoryId = p.SubCategoryId,
                SubCategoryName = p.SubCategory!.SubCategoryName,
                CategoryId = p.SubCategory!.Category!.CategoryId,
                CategoryName = p.SubCategory.Category.CategoryName,
                Sale = p.Sale,
                ProductSizeColors = p.ProductSizeColors.Select(psc => new ProductSizeColor
                {
                    PscId = psc.PscId,
                    ColorId = psc.ColorId,
                    SizeId = psc.SizeId,
                }).ToList(),
                CreatedDate = p.CreatedDate,
                Images = p.Images.Select(i => new Image
                {
                    ImageId = i.ImageId,
                    ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, i.ImageSrc),
                    ProductId = i.ProductId,
                    ImageMain = i.ImageMain,
                }).ToList()
            }).ToList();
            return productInfos;
        }

        public async Task<IEnumerable<Product>> GetAllActiveProducts()
        {
            var products = await _unitOfWork.Products.GetAllActiveProducts();
            var request = _httpContextAccessor.HttpContext!.Request;

            var productInfos = products.Select(p => new ProductInfo
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                Price = p.Price,
                Description = p.Description,
                SubCategoryId = p.SubCategoryId,
                SubCategoryName = p.SubCategory!.SubCategoryName,
                //CategoryId = p.SubCategory!.Category!.CategoryId,
                //CategoryName = p.SubCategory.Category.CategoryName,
                Sale = p.Sale,
                CreatedDate = p.CreatedDate,
                Images = p.Images.Select(i => new Image
                {
                    ImageId = i.ImageId,
                    ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, i.ImageSrc),
                    ProductId = i.ProductId,
                    ImageMain = i.ImageMain,
                }).ToList()
            }).ToList();
            return productInfos;
        }

        public Task<Product?> GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Product?> GetProductInfo(int id)
        {
            var product = await _unitOfWork.Products.GetProductCustom(id);
            var request = _httpContextAccessor.HttpContext!.Request;
            foreach(var image in product.Images)
            {
                image.ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, image.ImageSrc);
            }

            return product;
        }

        public async Task UpdateProduct(int id, [FromForm]Product product)
        {
            var existedProduct = await _unitOfWork.Products.GetById(id);
            if (existedProduct == null)
            {
                throw new BadHttpRequestException("Not found product", StatusCodes.Status400BadRequest);
            }

            existedProduct.ProductName = product.ProductName;
            existedProduct.Description = product.Description;
            existedProduct.Price = product.Price;
            existedProduct.SubCategoryId = product.SubCategoryId;
            existedProduct.Sale = product.Sale;
            
            await _unitOfWork.Products.Update(existedProduct);
        }

        public async Task<IEnumerable<Product>> GetFavouriteProducts(int customerId)
        {
            var products =  await _unitOfWork.Products.GetFavouriteProducts(customerId);

            var request = _httpContextAccessor.HttpContext!.Request;
            var productInfos = products.Select(p => new ProductInfo
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                Price = p.Price,
                Sale = p.Sale,
                Images = p.Images.Select(i => new Image
                {
                    ImageId = i.ImageId,
                    ImageLink = String.Format("{0}://{1}{2}/Images/{3}", request.Scheme, request.Host, request.PathBase, i.ImageSrc),
                    ProductId = i.ProductId,
                    ImageMain = i.ImageMain,
                }).ToList()
            }).ToList();

            return productInfos;
        }

        public byte[] ExportExcel(IEnumerable<Product> products)
        {
            DataTable dataTable = new DataTable("Products");
            dataTable.Columns.AddRange(new DataColumn[]
            {
                new DataColumn("ProductId"),
                new DataColumn("ProductName"),
                new DataColumn("Price(vnđ)"),
                new DataColumn("Sale(%)"),
                new DataColumn("CreatedDate"),
                new DataColumn("SubCategoryId"),
                new DataColumn("Description")
            });

            foreach(var product in products){
                dataTable.Rows.Add(product.ProductId, product.ProductName, product.Price, product.Sale, product.CreatedDate,product.SubCategoryId,product.Description);
            }

            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dataTable);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    return stream.ToArray();
                }

            }
        }

        public async Task ImportExcel([FromForm]IFormFile file)
        {
            try
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

                var uploadFolder = $"{Directory.GetCurrentDirectory()}\\Uploads";
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                var filePath = Path.Combine(uploadFolder, file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        bool isHeaderSkipped = false;
                        do
                        {
                            while (reader.Read())
                            {
                                if (!isHeaderSkipped)
                                {
                                    isHeaderSkipped = true;
                                    continue;
                                }

                                Product product = new Product();
                                product.ProductName = reader.GetValue(0).ToString();
                                product.Price = Convert.ToDouble(reader.GetValue(1));
                                product.Status = true;
                                product.CreatedDate = DateTime.Now;
                                product.Description = reader.GetValue(2) != null ? reader.GetValue(2).ToString() : String.Empty;
                                product.SubCategoryId = Convert.ToInt32(reader.GetValue(3));

                                await _unitOfWork.Products.Add(product);
                                await _unitOfWork.SaveChangesAsync();
                            }
                        } while (reader.NextResult());
                    }
                }
            }
            catch(Exception e)
            {
                throw new BadHttpRequestException(e.Message, StatusCodes.Status400BadRequest);
            }
        }
    }
}

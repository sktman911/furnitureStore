using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using FurnitureAPI.TempModels;
using Microsoft.Data.SqlClient;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly FurnitureContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductsController(FurnitureContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductInfo>>> GetProducts()
        {
            var products = _context.Images.Include(x => x.Product)
                .Where(x => x.Product!.Status == true)
                .Select(s => new ProductInfo
                {
                    ProductId = s.ProductId,
                    ProductName = s.Product!.ProductName,
                    Price = s.Product.Price,
                    SubCategoryId = s.Product.SubCategoryId,
                    SubCategoryName = s.Product.SubCategory!.SubCategoryName,
                    CategoryId = s.Product.SubCategory.Category!.CategoryId,
                    CategoryName = s.Product.SubCategory.Category!.CategoryName,
                    Images = _context.Images.Where(x => x.ImageMain == true && x.ProductId == s.ProductId).Select(s => new Image{ 
                        ImageId = s.ImageId,
                        ImageMain = s.ImageMain,
                        ImageSrc = s.ImageSrc,
                        ProductId = s.ProductId,
                        ImageLink = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, s.ImageSrc)
                    }).ToList() 
                });

            return await products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductInfo>> GetProduct(int id)
        {

            var product = _context.Images.Include(x => x.Product)
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
                        ImageLink = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, s.ImageSrc)
                    }).ToList()
                });

            if (product == null)
            {
                return NotFound();
            }

            return await product.FirstAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm]Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            product.Status = true;
            _context.Entry(product).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            ActionResult<ProductInfo> getProduct = await GetProduct(id);
            var result = getProduct.Value;

            return Ok(result);
        }


        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm]Product product)
        {
            try
            {
                product.Status = true;
                product.CreatedDate = DateTime.Now;
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                Image image = new Image();
                image.ProductId = product.ProductId;
                image.ImageMain = true;
                image.ImageSrc = await UploadImage(product.ImageFile!);
                _context.Images.Add(image);

                await _context.SaveChangesAsync();
            }catch(SqlException e)
            {
                return BadRequest(e.Message);
            }

            return StatusCode(201);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Xoa anh phu
            var images = _context.Images.Where(x => x.ProductId == id && x.ImageMain == false).ToList();
            foreach(var image in images)
            {
                _context.Images.Remove(image);
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Status = false;
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [NonAction]
        public async Task<string> UploadImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).ToArray());
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath,"Images",imageName);
            var fileStream = new FileStream(imagePath, FileMode.Create);
            await imageFile.CopyToAsync(fileStream);
            return imageName;
        }
    }
}

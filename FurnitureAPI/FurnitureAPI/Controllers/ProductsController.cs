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
using FurnitureAPI.Helpers;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductInfo>>> GetTopProductsByDesc()
        {
            var products = await _productService.GetTopProducts();

            return Ok(products);
        }

        // Admin product list
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ProductInfo>>> GetAll()
        {
            var products = await _productService.GetAllActiveProducts();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            var product = await _productService.GetProductInfo(id);

            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpGet("getFavourite/{customerId}")]
        public async Task<IEnumerable<Product>> GetFavouriteProducts(int customerId)
        {
            var imageLink = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/";
            var products = await _productService.GetFavouriteProducts(customerId);
            return products;
        }

        [HttpGet("exportExcel")]
        public async Task<FileResult> ExportProductsInExcel()
        {
            var products = await _productService.GetAllActiveProducts();
            var excelData = _productService.ExportExcel(products);
            return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Products.xlsx");
        }

        [HttpPost("importExcel")]
        public async Task<IActionResult> ImportProductsFromExcel([FromForm]IFormFile file)
        {
 
            if(file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            await _productService.ImportExcel(file);
            return Ok("Import successfully");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm]Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            try
            {
                await _productService.UpdateProduct(id, product);
                ActionResult<Product> getProduct = await GetProduct(id);
                var result = getProduct.Value;
                return Ok(result);
            }
            catch (BadHttpRequestException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm]Product product)
        {
            if(product.ImageFile == null)
            {
                return BadRequest(new {message= "Image can not be null"});
            }
            try
            {
                await _productService.AddProduct(product);
                return StatusCode(201);
            }
            catch (BadHttpRequestException e)
            {
                return BadRequest(e.Message);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                await _productService.DeleteProduct(id);
            }
            catch(BadHttpRequestException ex)
            {
                return NotFound(ex.Message);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NoContent();
        }

    }
}

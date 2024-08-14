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
using FurnitureAPI.Interface;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductInfo>>> GetTopProductsByDesc()
        {
            var products = await _unitOfWork.Products.GetTopProductsByDesc(Request);

            return Ok(products);
        }

        // Admin product list
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ProductInfo>>> GetAll()
        {
            var products = await _unitOfWork.Products.GetAllCustom(Request);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductInfo>> GetProduct(int id)
        {

            var product = _unitOfWork.Products.GetProductCustom(id, Request);

            if (product == null)
            {
                return NotFound();
            }
            return await product;
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
                var updatedProduct = await _unitOfWork.Products.Update(id, product);
                if(updatedProduct == null)
                {
                    return NotFound();
                }
                ActionResult<ProductInfo> getProduct = await GetProduct(id);
                var result = getProduct.Value;
                return Ok(result);
            }
            catch(Exception ex)
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
                var newProduct = await _unitOfWork.Products.Add(product);
                if(newProduct == null)
                {
                    return BadRequest(new { message = "Product name has existed!" });
                }
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deletedProduct = await _unitOfWork.Products.Delete(id);
            if(deletedProduct == null)
            {
                return NotFound(new {message="Product is not found"});
            }

            return NoContent();
        }

    }
}

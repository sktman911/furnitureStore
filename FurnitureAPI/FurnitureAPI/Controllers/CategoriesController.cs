using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;
using FurnitureAPI.Interface;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
          if (_unitOfWork.Categories == null)
          {
              return NotFound();
          }
          var categories = await _unitOfWork.Categories.GetAll();
           return Ok(categories);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
          if (_unitOfWork.Categories == null)
          {
              return NotFound();
          }
            var category = await _unitOfWork.Categories.GetById(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if(id != category.CategoryId)
            {
                return BadRequest();
            }

            try
            {
                var updateCategory = await _unitOfWork.Categories.Update(id, category);
                if (updateCategory == null)
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            var addedCategory = await _unitOfWork.Categories.Add(category);
           if(addedCategory == null){
                return BadRequest();
            }
            return CreatedAtAction("GetCategory", new { id = addedCategory.CategoryId }, addedCategory);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {

            var deletedCategory = await _unitOfWork.Categories.Delete(id);
            if (deletedCategory == null) {
                return BadRequest();
            }

            return NoContent();
        }
    }
}

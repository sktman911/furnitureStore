using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SubCategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategoryInfo>>> GetSubCategories()
        {
            var subCategories = await _unitOfWork.SubCategories.GetAllCustom();

            return Ok(subCategories);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory(int id)
        {
            if (_unitOfWork.SubCategories == null)
            {
                return NotFound();
            }
            var subCategory = await _unitOfWork.SubCategories.GetById(id);

            if (subCategory == null)
            {
                return NotFound();
            }

            return subCategory;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubCategory(int id, SubCategory subCategory)
        {
            if (id != subCategory.SubCategoryId)
            {
                return BadRequest();
            }

            try
            {
                var updatedSubCategory = await _unitOfWork.SubCategories.Update(id, subCategory);
                if (updatedSubCategory == null)
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<SubCategory>> PostSubCategory(SubCategory subCategory)
        {
            if(subCategory == null)
            {
                return BadRequest();
            }
            try
            {
                var addedSubCategory = await _unitOfWork.SubCategories.Add(subCategory);
                if (addedSubCategory == null)
                {
                    return BadRequest();
                }

                return CreatedAtAction("GetSubCategory", new { id = subCategory.SubCategoryId }, subCategory);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            try
            {
                var deletedSubCategory = await _unitOfWork.SubCategories.Delete(id);
                if(deletedSubCategory == null)
                {
                    return NotFound();
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly FurnitureContext _context;

        public SubCategoriesController(FurnitureContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategoryInfo>>> GetSubCategories()
        {
            var subCategories = await _context.SubCategories
                .Include(x => x.Category)
                .Select(s => new SubCategoryInfo
                {
                    SubCategoryId = s.SubCategoryId,
                    SubCategoryName = s.SubCategoryName,
                    CategoryId = s.CategoryId,
                    CategoryName = s.Category!.CategoryName
                })
                .ToListAsync();

            return subCategories;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory(int id)
        {
            if (_context.SubCategories == null)
            {
                return NotFound();
            }
            var subCategory = await _context.SubCategories.FindAsync(id);

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

            _context.Entry(subCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<SubCategory>> PostSubCategory(SubCategory subCategory)
        {
            if (_context.SubCategories == null)
            {
                return Problem("Entity set 'FurnitureContext.SubCategories'  is null.");
            }
            _context.SubCategories.Add(subCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubCategory", new { id = subCategory.SubCategoryId }, subCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            if (_context.SubCategories == null)
            {
                return NotFound();
            }
            var subCategory = await _context.SubCategories.FindAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }

            _context.SubCategories.Remove(subCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubCategoryExists(int id)
        {
            return (_context.SubCategories?.Any(e => e.SubCategoryId == id)).GetValueOrDefault();
        }
    }
}

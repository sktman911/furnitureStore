using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;
using System.Runtime.CompilerServices;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly FurnitureContext _context;

        public ColorsController(FurnitureContext context)
        {
            _context = context;
        }

        // GET: api/Colors1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
          if (_context.Colors == null)
          {
              return NotFound();
          }
            return await _context.Colors.ToListAsync();
        }

        // PUT: api/Colors1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(int id, Color color)
        {
            if (id != color.ColorId)
            {
                return BadRequest();
            }

            _context.Entry(color).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
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

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Color>>> GetProductSuzeColorsByClient(int id)
        {

            var result = await _context.Colors.Where(x => _context.ProductSizeColors.Any(y => y.ColorId == x.ColorId && y.ProductId == id)).ToListAsync();


            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        // POST: api/Colors1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
          if (_context.Colors == null)
          {
              return Problem("Entity set 'FurnitureContext.Colors'  is null.");
          }
            _context.Colors.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.ColorId }, color);
        }

        // DELETE: api/Colors1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            if (_context.Colors == null)
            {
                return NotFound();
            }
            var color = await _context.Colors.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            _context.Colors.Remove(color);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ColorExists(int id)
        {
            return (_context.Colors?.Any(e => e.ColorId == id)).GetValueOrDefault();
        }
    }
}

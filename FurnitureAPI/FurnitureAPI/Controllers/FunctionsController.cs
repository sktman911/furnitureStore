using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunctionsController : ControllerBase
    {
        private readonly FurnitureContext _context;

        public FunctionsController(FurnitureContext context)
        {
            _context = context;
        }

        // GET: api/Functions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Function>>> GetFunctions()
        {
          if (_context.Functions == null)
          {
              return NotFound();
          }
            return await _context.Functions.ToListAsync();
        }

        [HttpGet("/api/Titles")]
        public async Task<ActionResult<IEnumerable<Function>>> GetFunctionsTitle()
        {
            if (_context.Functions == null)
            {
                return NotFound();
            }
            var functions = await _context.Functions.ToListAsync();

            var titles = functions
                .GroupBy(x => x.FunctionTitle)
                .Select(g => g.FirstOrDefault())
                .OrderBy(x => x!.FunctionTitle)
                .ToList();
            return titles!;
        }

    }
}

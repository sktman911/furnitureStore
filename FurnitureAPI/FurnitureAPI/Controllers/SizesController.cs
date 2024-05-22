﻿using FurnitureAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizesController : ControllerBase
    {
        private readonly FurnitureContext _context;
        public SizesController(FurnitureContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizes()
        {
            return await _context.Sizes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Size>>> GetSize(int id)
        {

            var result = await _context.Sizes.Where(x => x.ProductSizeColors.Any(y => y.SizeId == x.SizeId && y.ProductId == id)).ToListAsync();


            if (result == null)
            {
                return NotFound();
            }

            return result;
        }
    }
}
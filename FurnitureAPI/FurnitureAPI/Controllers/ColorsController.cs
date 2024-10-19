using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly IColorService _colorService;

        public ColorsController(IColorService colorService)
        {
            _colorService = colorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
            var colors = await _colorService.GetColors();
            return Ok(colors);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(int id, Color color)
        {
            if (id != color.ColorId)
            {
                return BadRequest();
            }

            try
            {
                await _colorService.UpdateColor(id, color);
                return NoContent();

            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Color>>> GetColorByProduct(int id)
        {

            var result = await _colorService.GetColorsByProductId(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            try
            {
                await _colorService.AddColor(color);
                return CreatedAtAction("GetColorByProduct", new { id = color.ColorId }, color);
            }
            catch (KeyNotFoundException)
            {
                return BadRequest(new { message = "Color name has existed" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Something went wrong. Please try again!", error = e });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            try
            {
                await _colorService.DeleteColor(id);
                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

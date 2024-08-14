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
    public class ColorsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ColorsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
            var colors = await _unitOfWork.Colors.GetAll();
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
                var updatedColor = await _unitOfWork.Colors.Update(id, color);
                if (updatedColor == null)
                {
                    return NotFound();
                }
                return NoContent();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Color>>> GetColorByProduct(int id)
        {

            var result = await _unitOfWork.Colors.GetColorsByProduct(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            try
            {
                var addedColor = await _unitOfWork.Colors.Add(color);

                if (addedColor == null)
                {
                    return BadRequest(new { message = "Color has existed!" });
                }
                return CreatedAtAction("GetColorByProduct", new { id = color.ColorId }, color);
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
                var color = await _unitOfWork.Colors.Delete(id);
                if (color == null)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

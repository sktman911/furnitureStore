using FurnitureAPI.Models;
using FurnitureAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private IFavouriteService _favouriteService;
        public FavouritesController(IFavouriteService favouriteService)
        {
            _favouriteService = favouriteService;
        }


        [HttpGet("{customerId}&&{productId}")]
        public async Task<ActionResult<IEnumerable<Favourite>>> GetFavourite(int customerId, int productId)
        {
            var favourite = await _favouriteService.GetFavourite(customerId,productId);
            return Ok(favourite);
        }

        [HttpPost]
        public async Task<ActionResult<Favourite>> AddFavourite(Favourite favourite)
        {
            try
            {
                await _favouriteService.AddFavourite(favourite);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok(favourite);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFavourite(int id, Favourite favourite)
        {
            try
            {
                await _favouriteService.UpdateFavourite(id, favourite);
            }catch(BadHttpRequestException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            var result = await _favouriteService.GetFavourite((int)favourite.CusId!, (int)favourite.ProductId!);

            return Ok(result);
        }
    }
}

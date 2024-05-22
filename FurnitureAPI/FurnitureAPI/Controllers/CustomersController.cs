using FurnitureAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private FurnitureContext _context;
        public CustomersController(FurnitureContext _context)
        {
            this._context = _context;
        }


        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var result = await _context.Customers.FindAsync(id);
            if(result == null)
            {
                return NotFound();
            }

            return result;
        }

    }
}

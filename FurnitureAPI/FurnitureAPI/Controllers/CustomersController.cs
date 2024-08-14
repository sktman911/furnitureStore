using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private FurnitureContext _context;
        private readonly IConfiguration configuration;
        private readonly IUnitOfWork _unitOfWork;
        public CustomersController(FurnitureContext _context, IConfiguration configuration, IUnitOfWork unitOfWork)
        {

            this._context = _context;
            this.configuration = configuration;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _unitOfWork.Customers.GetAll();
            return Ok(customers);
        }


        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var result = await _unitOfWork.Customers.GetById(id);
            if(result == null)
            {
                return NotFound();
            }

            return result;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> EditInfo(int id, Customer customer)
        {
            
            if (id != customer.CusId)
            {
                return NotFound();
            }

            try
            {
                var updatedCustomer = await _unitOfWork.Customers.Update(id, customer);
                if (customer == null)
                {
                    return NotFound();
                }
                if (updatedCustomer!.CusId == 0)
                {
                    return BadRequest(new { message = "Username has existed" });
                }
                var furnitureToken = TokenHelper.GenerateJWTToken(updatedCustomer, configuration);
                return new JsonResult(new { token = furnitureToken });
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

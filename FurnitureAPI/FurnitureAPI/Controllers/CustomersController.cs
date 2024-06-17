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
        public CustomersController(FurnitureContext _context, IConfiguration configuration)
        {

            this._context = _context;
            this.configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            if(_context.Customers == null)
            {
                return NotFound();
            }

            return await _context.Customers.ToListAsync();
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


        [HttpPut("{id}")]
        public async Task<ActionResult> EditInfo(int id, Customer customerData)
        {
            
            if (id != customerData.CusId)
            {
                return NotFound();
            }

            var customer = await _context.Customers.FindAsync(id);
            if(customer == null)
            {
                return NotFound();
            }

            // request customer pass or do below

            customer.CusName = customerData.CusName;
            customer.CusPhone = customerData.CusPhone;
            customer.CusAddress = customerData.CusAddress;
            customer.DoB = customerData.DoB;
            customer.Email = customerData.Email;          

            if(customer.Username != customerData.Username)
            {
                customer.Username = customerData.Username;
                await _context.SaveChangesAsync();

                var key = configuration["Jwt:Key"];
                var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var signCredential = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim>
                {
                    new Claim("cusId", customer.CusId.ToString()),
                     new Claim("username", customer.Username!)
                };

                // create token
                var token = new JwtSecurityToken(
                    issuer: configuration["Jwt:Issuer"],
                    audience: configuration["Jwt:Audience"],
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signCredential,
                    claims: claims
                );

                // new string token
                var furnitureToken = new JwtSecurityTokenHandler().WriteToken(token);
                return new JsonResult(new { token = furnitureToken });
            }

            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}

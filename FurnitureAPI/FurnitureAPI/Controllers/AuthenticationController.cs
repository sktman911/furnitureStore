using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.TempModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FurnitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly FurnitureContext _context;
        private readonly IConfiguration configuration;

        public AuthenticationController(FurnitureContext _context, IConfiguration configuration)
        {
            this._context = _context;
            this.configuration = configuration;
        }

        [HttpPost]
        public IActionResult Login(LoginModel loginModel)
        {
            var customer = _context.Customers.FirstOrDefault(x => x.Username == loginModel.Username);      
            if (customer != null)
            {
                var checkPassword = HashHelper.VerifyPasswordSHA256(loginModel.Password!, customer!.Password!);
                if (!checkPassword)
                {
                    return Forbid();
                }
                var furnitureToken = TokenHelper.GenerateJWTToken(customer, configuration);
                return new JsonResult(new { username = loginModel.Username, token = furnitureToken });
            }

            var emp = _context.Employees.Include(x => x.Role).FirstOrDefault(x => x.Username == loginModel.Username);
            if (emp != null)
            {
                var checkPassword = HashHelper.VerifyPasswordSHA256(loginModel.Password!, emp!.Password!);
                if (!checkPassword)
                {
                    return Forbid();
                }
                var furnitureToken = TokenHelper.GenerateJWTToken(emp, configuration);
                return new JsonResult(new { username = loginModel.Username, token = furnitureToken });
            }

            return new JsonResult(new { message = "Login Failed" });
        }

        [HttpPost("signup")]
        public IActionResult Signup(Customer cus)
        {
            if(cus == null)
            {
                return BadRequest();
            }

            // check if email existed
            if (!CheckEmail(cus.Email!))
            {
                return new JsonResult(new {message = "Email has been existed"});
            }

            // check if email existed
            if (!CheckPhone(cus.CusPhone!))
            {
                return new JsonResult(new { message = "Phone has been existed" });
            }

            // check if email existed
            if (!CheckUsername(cus.Username!))
            {
                return new JsonResult(new { message = "Username has been existed" });
            }

            string hashPassword = HashHelper.HashPasswordSHA256(cus.Password!);
            cus.Password = hashPassword;

            _context.Customers.Add(cus);
             _context.SaveChanges();
            return new JsonResult(new {message = "Sign up successfully"});
        }

        private bool CheckPhone(string phoneNum)
        {
            var result = _context.Customers.FirstOrDefault(x => x.CusPhone == phoneNum);

            if(result != null)
            {
                return false;
            }
            return true;
        }

        private bool CheckUsername(string username)
        {
            var result = _context.Customers.FirstOrDefault(x => x.Username == username);

            if (result != null)
            {
                return false;
            }
            return true;
        }

        private bool CheckEmail(string email)
        {
            var result = _context.Customers.FirstOrDefault(x => x.Email == email);

            if (result != null)
            {
                return false;
            }
            return true;
        }
    }
}

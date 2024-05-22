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
            var md5Hash = GenerateMD5(loginModel.Password!);

            var customer = _context.Customers.FirstOrDefault(x => x.Username == loginModel.Username && x.Password == loginModel.Password);
            if (customer != null)
            {
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
                return new JsonResult(new { username = loginModel.Username, token = furnitureToken });
            }

            var emp = _context.Employees.Include(x => x.Role).FirstOrDefault(x => x.Username == loginModel.Username && x.Password == loginModel.Password);
            if (emp != null)
            {

                var key = configuration["Jwt:Key"];
                var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var signCredential = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim>
                {
                     new Claim("empId", emp.EmpId.ToString()),
                     new Claim("username", emp.Username!),
                     new Claim("role", emp.Role!.RoleName!)
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
                return new JsonResult(new { username = loginModel.Username, token = furnitureToken });
            }

            return new JsonResult(new { message = "Login Failed" });
        }

        //private static string Generate256(string rawData)
        //{
        //    // Create a SHA256
        //    using (SHA256 sha256Hash = SHA256.Create())
        //    {
        //        // ComputeHash - returns byte array
        //        byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

        //        // Convert byte array to a string
        //        StringBuilder builder = new StringBuilder();
        //        for (int i = 0; i < bytes.Length; i++)
        //        {
        //            builder.Append(bytes[i].ToString("x2"));
        //        }
        //        return builder.ToString();
        //    }
        //}

        private static string GenerateMD5(string input)
        {
            StringBuilder hash = new StringBuilder();
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] bytes = md5Hash.ComputeHash(new UTF8Encoding().GetBytes(input));

                for (int i = 0; i < bytes.Length; i++)
                {
                    hash.Append(bytes[i].ToString("x2"));
                }
                return hash.ToString();
            }
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

            _context.Customers.Add(cus);
             _context.SaveChanges();
            return new JsonResult(new {message = "Sign up successfully"});
        }

        private bool CheckPhone(string phoneNum)
        {
            var result = _context.Customers.First(x => x.CusPhone == phoneNum);

            if(result != null)
            {
                return false;
            }
            return true;
        }

        private bool CheckUsername(string username)
        {
            var result = _context.Customers.First(x => x.Username == username);

            if (result != null)
            {
                return false;
            }
            return true;
        }

        private bool CheckEmail(string email)
        {
            var result = _context.Customers.First(x => x.Email == email);

            if (result != null)
            {
                return false;
            }
            return true;
        }
    }
}

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
    public class FunctionsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public FunctionsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Function>>> GetFunctions()
        {
            var functions = await _unitOfWork.Functions.GetAll();
            return Ok(functions);
        }

        [HttpGet("/api/Titles")]
        public async Task<ActionResult<IEnumerable<Function>>> GetFunctionsTitle()
        {
            var result = await _unitOfWork.Functions.GetListTitle();
            return Ok(result);
        }

    }
}

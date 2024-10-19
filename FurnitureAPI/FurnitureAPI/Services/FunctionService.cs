using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class FunctionService : IFunctionService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FunctionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Function>> GetAllFunctions()
        {
            var functions = await _unitOfWork.Functions.GetAll();
            return functions;
        }

        public async Task<IEnumerable<Function>> GetFunctionsTitle()
        {
            var titles = await _unitOfWork.Functions.GetTitles();    
            return titles;
        }
    }
}

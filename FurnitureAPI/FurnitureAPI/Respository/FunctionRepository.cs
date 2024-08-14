using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Respository
{
    public class FunctionRepository : IFunctionRepository
    {
        private readonly FurnitureContext _context;
        public FunctionRepository(FurnitureContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Function>> GetAll()
        {
            return await _context.Functions.ToListAsync();
        }

        public async Task<IEnumerable<Function>> GetListTitle()
        {
            var functions = await _context.Functions.ToListAsync();

            var titles =  functions
                .GroupBy(x => x.FunctionTitle)
                .Select(g => g.FirstOrDefault())
                .OrderBy(x => x!.FunctionTitle)
                ;
            return titles!;
        }
        public Task<Function?> Add(Function entity)
        {
            throw new NotImplementedException();
        }

        public Task<Function?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Function?> Update(int id, Function entity)
        {
            throw new NotImplementedException();
        }
        public Task<Function> GetById(int id)
        {
            throw new NotImplementedException();
        }

    }
}

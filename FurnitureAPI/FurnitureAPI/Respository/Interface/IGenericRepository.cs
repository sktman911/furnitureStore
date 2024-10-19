using FurnitureAPI.Models;

namespace FurnitureAPI.Respository.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T?> GetById(int id);
        Task Add(T entity);
        Task Update( T entity);
        Task Delete(T entity);
        Task<T?> FindByName(string name);
    }
}

using FurnitureAPI.Models;

namespace FurnitureAPI.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task<T?> Add(T entity);
        Task<T?> Update(int id, T entity);
        Task<T?> Delete(int id);
    }
}

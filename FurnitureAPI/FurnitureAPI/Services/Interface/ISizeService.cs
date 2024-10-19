using FurnitureAPI.Models;

namespace FurnitureAPI.Services.Interface
{
    public interface ISizeService
    {
        Task<IEnumerable<Size>> GetSizes();

        Task<IEnumerable<Size>> GetSizesByProductId(int productId);

    }
}

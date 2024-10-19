using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class ColorService : IColorService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ColorService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddColor(Color color)
        {
            var existedColor = await _unitOfWork.Colors.FindByName(color.ColorName!);
            if(existedColor != null)
            {
                throw new KeyNotFoundException();
            }
            await _unitOfWork.Colors.Add(color);
        }

        public async Task DeleteColor(int id)
        {
            var existedColor = await _unitOfWork.Colors.GetById(id);
            if (existedColor == null)
            {
                throw new KeyNotFoundException();
            }
            await _unitOfWork.Colors.Delete(existedColor);
        }

        public async Task<Color?> GetColorById(int id)
        {
            var color = await _unitOfWork.Colors.GetById(id);
            return color;
        }

        public async Task<IEnumerable<Color>> GetColors()
        {
            var colors = await _unitOfWork.Colors.GetAll();
            return colors;
        }

        public Task<IEnumerable<Color>> GetColorsByProductId(int productId)
        {
            var colors = _unitOfWork.Colors.GetColorsByProductId(productId);
            return colors;
        }

        public async Task UpdateColor(int id, Color color)
        {
            var existedColor = await _unitOfWork.Colors.GetById(id);
            if (existedColor == null)
            {
                throw new KeyNotFoundException();
            }
            existedColor.ColorName = color.ColorName;
            existedColor.ColorHexcode = color.ColorHexcode;
            await _unitOfWork.Colors.Update(existedColor);
        }
    }
}

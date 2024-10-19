using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FurnitureAPI.Services
{
    public class ImageService : IImageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly HandleImage _handleImage;
        public ImageService(IUnitOfWork unitOfWork, HandleImage handleImage)
        {
            _unitOfWork = unitOfWork;
            _handleImage = handleImage;
        }

        public async Task AddImageByProduct(int productId, IFormFile productImageFile)
        {
            Image image = new Image();
            image.ProductId = productId;
            image.ImageMain = true;
            image.ImageSrc = await _handleImage.UploadImage(productImageFile);
            await _unitOfWork.Images.Add(image);
        }

        public async Task AddImages([FromForm]Image image)
        {
            List<Image> list = new List<Image>();
            foreach (var item in image.ImageFiles!)
            {
                image.ImageId = 0;
                image.ImageSrc = await _handleImage.UploadImage(item);
                list.Add(image);
            }
            await _unitOfWork.Images.AddListImages(list);
        }

        public Task DeleteImage(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Image>> GetSubImagesByProductId(int productId, HttpRequest httpRequest)
        {
            var subImages = await _unitOfWork.Images.GetListById(productId);
            var result = subImages.Select(s => new Image
            {
                ImageId = s.ImageId,
                ImageMain = s.ImageMain,
                ImageSrc = s.ImageSrc,
                ImageLink = String.Format("{0}://{1}{2}/Images/{3}", httpRequest.Scheme, httpRequest.Host, httpRequest.PathBase, s.ImageSrc)
            }).ToList();
            return result;
        }

        public Task<Image?> GetImageById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateImages([FromForm]Image image)
        {
            var files = image.ImageFiles;
            var ids = image.Ids;

            List<Image> list = new List<Image>();
            for (int i = 0; i < files!.Count; i++)
            {
                var existImg = await _unitOfWork.Images.GetById(ids![i]);
                if (existImg == null)
                {
                    throw new BadHttpRequestException("Not found image",StatusCodes.Status404NotFound);
                }
                existImg.ImageSrc = await _handleImage.UploadImage(files[i]);
                list.Add(existImg);
            }
            await _unitOfWork.Images.UpdateListImages(list);
        }

        public async Task UpdateImageByProduct(int productId, IFormFile productImageFile)
        {
            var image = await _unitOfWork.Images.GetMainImageByProductId(productId);
            image!.ImageSrc = await _handleImage.UploadImage(productImageFile);
            await _unitOfWork.Images.Update(image);
        }
    }
}

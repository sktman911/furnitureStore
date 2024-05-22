using FurnitureAPI.Models.VnPayModel;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Services
{
    public interface IVnPayService { 
        string CreatePaymentUrl(HttpContext context, VnPayRequestModel model);

        VnPayResponseModel PaymentExcute(IQueryCollection collections);
    }
}

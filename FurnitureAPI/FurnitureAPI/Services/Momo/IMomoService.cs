using FurnitureAPI.Models.MomoModel;

namespace FurnitureAPI.Services.Momo
{
    public interface IMomoService
    {
        string CreatePaymentUrl(HttpContext context, MomoOTRequestModel momoOTRequestModel);

        MomoRequestResultModel PaymentExcute(IQueryCollection collections);
    }
}

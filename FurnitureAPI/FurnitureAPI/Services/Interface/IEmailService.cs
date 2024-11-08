using FurnitureAPI.TempModels;

namespace FurnitureAPI.Services.Interface
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailContactModel model);
    }
}

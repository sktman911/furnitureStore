using FurnitureAPI.Services.Interface;
using FurnitureAPI.TempModels;
using System.Net.Mail;
using FurnitureAPI.Config;
using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace FurnitureAPI.Services
{
    //public class EmailService : IEmailService
    //{
    //    private readonly int _smtpPort = 587;
    //    private readonly string _smtpHost = "smtp.gmail.com";

    //    public Task SendEmailAsync(EmailContactModel model)
    //    {
    //        if (model == null)
    //        {
    //            throw new BadHttpRequestException("Invalid model");
    //        }

    //        var mailMessage = new MailMessage
    //        {
    //            From = new MailAddress(model.Email!),
    //            Subject = model.Subject,
    //            Body = model.Message,
    //            IsBodyHtml = false,
    //        };
    //        mailMessage.To.Add(Constant.SHOP_EMAIL);

    //        using var smtpClient = new SmtpClient(_smtpHost)
    //        {
    //            Port = _smtpPort,
    //            Credentials = new NetworkCredential(model.Email, model.)
    //        };

    //    }
    //}
}

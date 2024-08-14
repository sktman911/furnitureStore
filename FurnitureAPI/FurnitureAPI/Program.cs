using FurnitureAPI.Helpers;
using FurnitureAPI.Interface;
using FurnitureAPI.Models;
using FurnitureAPI.Respository;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<FurnitureContext>();

// use Singleton for only 1 instance in systems
builder.Services.AddSingleton<HandleImage>();
builder.Services.AddSingleton<IVnPayService, VnPayService>();
builder.Services.AddSingleton<IMomoService, MomoService>();
builder.Services.AddSingleton<PaymentURL>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(15);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;

});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
            policy =>
            {
                policy.WithOrigins("http://localhost:3000", "https://test-payment.momo.vn", "https://localhost:7183")
                       .AllowAnyMethod()
                       .AllowCredentials()
                       .AllowAnyHeader().SetIsOriginAllowed((host) => true);
            });
});


builder.Services.AddDistributedMemoryCache();


// JWT
// get key from setting
var key = builder.Configuration["Jwt:Key"];

// encrypt key
var encryptKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
// add authentication bearer
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        // setting expire
        RequireExpirationTime = true,
        ValidateLifetime = true,
        // key use for token
        IssuerSigningKey = encryptKey,
        RequireSignedTokens = true
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


var contentRootPath = builder.Environment.ContentRootPath;
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(contentRootPath, "Images")),
    RequestPath = "/Images"
});

app.UseCors("AllowOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseRouting();


app.UseSession();

app.Run();

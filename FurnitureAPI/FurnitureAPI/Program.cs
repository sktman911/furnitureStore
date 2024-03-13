using FurnitureAPI.Helpers;
using FurnitureAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<FurnitureContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<HandleImage>();


builder.Services.AddCors();

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
    app.UseCors(builder => builder.WithOrigins("http://localhost:3000", "https://localhost:7183").AllowAnyHeader().AllowAnyMethod());
}

app.UseHttpsRedirection();


var contentRootPath = builder.Environment.ContentRootPath;
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(contentRootPath, "Images")),
    RequestPath = "/Images"

});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

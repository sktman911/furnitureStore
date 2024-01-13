using FurnitureAPI.Models;
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


builder.Services.AddCors();

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

// get key from setting
var key = app.Configuration["Jwt:Key"];
// encrypt key
var encryptKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

app.UseStaticFiles(new StaticFileOptions {
    FileProvider = new PhysicalFileProvider(Path.Combine(contentRootPath,"Images")),
    RequestPath = "/Images"

});

app.UseAuthorization();

app.MapControllers();

app.Run();

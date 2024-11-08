using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using FurnitureAPI.Helpers;
using FurnitureAPI.Hubs;
using FurnitureAPI.Models;
using FurnitureAPI.Respository;
using FurnitureAPI.Respository.Interface;
using FurnitureAPI.Services;
using FurnitureAPI.Services.Interface;
using FurnitureAPI.Services.Momo;
using FurnitureAPI.Services.VnPay;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
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
builder.Services.AddHttpContextAccessor();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductSizeColorService, ProductSizeColorService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IColorService, ColorService>();
builder.Services.AddScoped<ISizeService, SizeService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();
builder.Services.AddScoped<IFunctionService, FunctionService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IFavouriteService, FavouriteService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IStatisticService, StatisticService>();


builder.Services.AddControllers();
builder.Services.AddSignalR();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});


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
                policy.WithOrigins("http://localhost:3000", "https://furniture-store-tawny.vercel.app")
                       .AllowAnyMethod()
                       .AllowCredentials()
                       .AllowAnyHeader();
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

if (app.Environment.IsProduction())
{
    app.UseForwardedHeaders();
    app.UseDeveloperExceptionPage();
    app.UseHttpsRedirection();
}


//var contentRootPath = builder.Environment.ContentRootPath;
var rootPath = builder.Environment.WebRootPath;
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(rootPath, "Images")),
    RequestPath = "/Images"
});


app.UseCors("AllowOrigin");

app.UseAuthentication();

app.MapHub<OrderHub>("/orderHub");
app.MapControllers();

app.UseRouting();

app.UseAuthorization();

//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers();
//});


app.UseSession();

app.Run();

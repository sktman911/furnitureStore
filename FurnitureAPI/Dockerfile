# Sử dụng image .NET ASP.NET để chạy ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Sử dụng image .NET SDK để build ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
# Sao chép file .csproj vào container và khôi phục các gói
COPY ["FurnitureAPI/FurnitureAPI.csproj", "FurnitureAPI/"]
RUN dotnet restore "FurnitureAPI/FurnitureAPI.csproj"
# Sao chép toàn bộ nội dung dự án
COPY . .
WORKDIR "/src/FurnitureAPI"
# Build project
RUN dotnet build "FurnitureAPI.csproj" -c Release -o /app/build

# Publish ứng dụng
FROM build AS publish
RUN dotnet publish "FurnitureAPI.csproj" -c Release -o /app/publish

# Sử dụng image base để chạy ứng dụng
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FurnitureAPI.dll"]

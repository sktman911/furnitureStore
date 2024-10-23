# Stage 1: Build the project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the backend project
COPY ./FurnitureAPI/FurnitureAPI ./FurnitureAPI

# Restore dependencies
RUN dotnet restore ./FurnitureAPI/FurnitureAPI.csproj

# Build the project
RUN dotnet build ./FurnitureAPI/FurnitureAPI.csproj -c Release -o /app/build

# Stage 2: Run the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Sao chép các file đã build
COPY --from=build /app/build .

# Tạo thư mục Images nếu cần thiết
RUN mkdir -p /app/Images

# Start the application
ENTRYPOINT ["dotnet", "FurnitureAPI.dll"]

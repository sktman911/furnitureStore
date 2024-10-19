# Stage 1: Build the project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the backend project
COPY ./FurnitureAPI/FurnitureAPI ./FurnitureAPI

# Restore dependencies
RUN dotnet restore ./FurnitureAPI/FurnitureAPI.csproj

# Build the project
RUN dotnet build ./FurnitureAPI/FurnitureAPI.csproj -c Release -o /app/build

COPY ./Images ./Images

# Stage 2: Run the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/build .

# Start the application
ENTRYPOINT ["dotnet", "FurnitureAPI.dll"]
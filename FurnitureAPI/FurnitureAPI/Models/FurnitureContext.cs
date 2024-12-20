﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FurnitureAPI.Models
{
    public partial class FurnitureContext : DbContext
    {
        public FurnitureContext()
        {
        }

        public FurnitureContext(DbContextOptions<FurnitureContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Color> Colors { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        public virtual DbSet<Function> Functions { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OrderMethod> OrderMethods { get; set; } = null!;
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductSizeColor> ProductSizeColors { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Size> Sizes { get; set; } = null!;
        public virtual DbSet<SubCategory> SubCategories { get; set; } = null!;
        public virtual DbSet<Favourite> Favourites { get; set; } = null!;

        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer("Server=.;Database=Furniture;Trusted_Connection=True;");
                //optionsBuilder.UseNpgsql("Host=dpg-cshg5nij1k6c739796u0-a.singapore-postgres.render.com;Port=5432;Username=luxurysg_db_user;Password=dRDwbP8enuSxArx5zqR7g1IjbCArGeVl;Database=luxurysg_db;Trust Server Certificate=true;");
                optionsBuilder.UseSqlServer("Server=luxurySG_db.mssql.somee.com;workstation id=luxurySG_db.mssql.somee.com;packet size=4096;user id=sktman911_SQLLogin_1;pwd=2gl2cal3wc;data source=luxurySG_db.mssql.somee.com;persist security info=False;initial catalog=luxurySG_db;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(50)
                    .HasColumnName("category_name");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.ToTable("color");

                entity.Property(e => e.ColorId).HasColumnName("color_id");

                entity.Property(e => e.ColorHexcode)
                    .HasMaxLength(50)
                    .HasColumnName("color_hexcode");

                entity.Property(e => e.ColorName)
                    .HasMaxLength(50)
                    .HasColumnName("color_name");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CusId)
                    .HasName("PK__Customer__E84D41E827CEFF59");

                entity.ToTable("customer");

                entity.Property(e => e.CusId).HasColumnName("cus_id");

                entity.Property(e => e.CusAddress)
                    .HasMaxLength(100)
                    .HasColumnName("cus_address");

                entity.Property(e => e.CusName)
                    .HasMaxLength(100)
                    .HasColumnName("cus_name");

                entity.Property(e => e.CusPhone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("cus_phone");

                entity.Property(e => e.DoB)
                    .HasColumnType("date")
                    .HasColumnName("doB");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmpId)
                    .HasName("PK__Employee__1299A861016FBE44");

                entity.ToTable("employee");

                entity.Property(e => e.EmpId).HasColumnName("emp_id");

                entity.Property(e => e.DoB)
                    .HasColumnType("date")
                    .HasColumnName("doB");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.EmpAddress)
                    .HasMaxLength(100)
                    .HasColumnName("emp_address");

                entity.Property(e => e.EmpName)
                    .HasMaxLength(100)
                    .HasColumnName("emp_name");

                entity.Property(e => e.EmpPhone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("emp_phone");

                entity.Property(e => e.Password)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Employee__role_i__6477ECF3");
            });

            modelBuilder.Entity<Function>(entity =>
            {
                entity.ToTable("function_");

                entity.Property(e => e.FunctionId).HasColumnName("function_id");

                entity.Property(e => e.FuntionName)
                    .HasMaxLength(50)
                    .HasColumnName("funtion_name");

                entity.Property(e => e.Icon)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("icon");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Route)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("route");

                entity.Property(e => e.FunctionTitle)
                    .HasMaxLength(50)
                    .HasColumnName("function_title");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Functions)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Function___role___5FB337D6");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("order_");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.CusId).HasColumnName("cus_id");

                entity.Property(e => e.OmId).HasColumnName("om_id");
                entity.Property(e => e.OrderAddress).HasColumnName("order_address");
                entity.Property(e => e.OrderPhone).HasColumnName("order_phone");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasColumnName("order_date");

                entity.Property(e => e.OsId).HasColumnName("os_id");

                entity.Property(e => e.TotalPrice).HasColumnName("total_price");

                entity.Property(e => e.TotalQuantity).HasColumnName("total_quantity");

                entity.HasOne(d => d.Cus)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CusId)
                    .HasConstraintName("FK__Order___cus_id__693CA210");

                entity.HasOne(d => d.Om)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OmId)
                    .HasConstraintName("FK__Order___om_id__68487DD7");

                entity.HasOne(d => d.Os)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OsId)
                    .HasConstraintName("FK__Order___os_id__6754599E");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.OdId)
                    .HasName("PK__OrderDet__FB4B2EFECBA3BDDF");

                entity.ToTable("orderDetail");

                entity.Property(e => e.OdId).HasColumnName("od_id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.PscId).HasColumnName("psc_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.ReviewStatus).HasColumnName("review_status");

                entity.Property(e => e.UnitPrice).HasColumnName("unit_price");

                //entity.HasOne(d => d.Order)
                //    .WithMany(p => p.OrderDetails)
                //    .HasForeignKey(d => d.OrderId)
                //    .HasConstraintName("FK__OrderDeta__order__6C190EBB");

                entity.HasOne(d => d.ProductSizeColor)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.PscId)
                    .HasConstraintName("FK_OrderDetail_ProductSizeColor");


            });

            modelBuilder.Entity<OrderMethod>(entity =>
            {
                entity.HasKey(e => e.OmId)
                    .HasName("PK__OrderMet__CBB505A7A302DBA5");

                entity.ToTable("orderMethod");

                entity.Property(e => e.OmId).HasColumnName("om_id");

                entity.Property(e => e.OmName)
                    .HasMaxLength(50)
                    .HasColumnName("om_name");
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.HasKey(e => e.OsId)
                    .HasName("PK__OrderSta__374FA4B595B08116");

                entity.ToTable("orderStatus");

                entity.Property(e => e.OsId).HasColumnName("os_id");

                entity.Property(e => e.OsName)
                    .HasMaxLength(50)
                    .HasColumnName("os_name");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(100)
                    .HasColumnName("product_name");

                entity.Property(e => e.Sale).HasColumnName("sale");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.SubCategoryId).HasColumnName("subCategory_id");

                entity.HasOne(d => d.SubCategory)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SubCategoryId)
                    .HasConstraintName("FK__Product__subCate__5629CD9C");
            });

            modelBuilder.Entity<ProductSizeColor>(entity =>
            {
                entity.HasKey(e => e.PscId)
                    .HasName("PK__Product___ACF5453BE6958D33");

                entity.ToTable("product_Size_Color");

                entity.Property(e => e.PscId).HasColumnName("psc_id");

                entity.Property(e => e.ColorId).HasColumnName("color_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.SizeId).HasColumnName("size_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Color)
                    .WithMany(p => p.ProductSizeColors)
                    .HasForeignKey(d => d.ColorId)
                    .HasConstraintName("FK__Product_S__color__5AEE82B9");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSizeColors)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Product_S__produ__59063A47");

                entity.HasOne(d => d.Size)
                    .WithMany(p => p.ProductSizeColors)
                    .HasForeignKey(d => d.SizeId)
                    .HasConstraintName("FK__Product_S__size___59FA5E80");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<Size>(entity =>
            {
                entity.ToTable("size");

                entity.Property(e => e.SizeId).HasColumnName("size_id");

                entity.Property(e => e.SizeName)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .HasColumnName("size_name");
            });

            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.ToTable("subCategory");

                entity.Property(e => e.SubCategoryId).HasColumnName("subCategory_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.SubCategoryName)
                    .HasMaxLength(50)
                    .HasColumnName("subCategory_name");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.SubCategories)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__SubCatego__categ__4F7CD00D");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.ToTable("image");

                entity.Property(e => e.ImageId).HasColumnName("image_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ImageSrc)
                    .HasMaxLength(200)
                    .HasColumnName("image_src");

                entity.Property(e => e.ImageMain)
                    .HasColumnName("image_main");
            });

            modelBuilder.Entity<Favourite>(entity =>
            {
                entity.HasKey(e => e.FavouriteId)
                    .HasName("PK__Favourit__B3E742CEBCFD8025");

                entity.ToTable("favourite");
                entity.Property(e => e.FavouriteId).HasColumnName("favourite_id");
                entity.Property(e => e.CusId).HasColumnName("cus_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.IsFavourite).HasColumnName("is_favourite");
                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Product_Favourite");


                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.CusId)
                    .HasConstraintName("FK_Customer_Favourite");

            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.ReviewId)
                    .HasName("PK_Review__PRIMARY");

                entity.ToTable("review");
                entity.Property(e => e.ReviewId).HasColumnName("review_id");
                entity.Property(e => e.CusId).HasColumnName("cus_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.Comment).HasColumnName("comment");
                entity.Property(e => e.Rating).HasColumnName("rating");
                entity.Property(e => e.ReviewedDate).HasColumnName("reviewed_date");
                entity.Property(e => e.OdId).HasColumnName("od_id");

                //entity.HasOne(d => d.Product)
                //    .WithMany(p => p.Reviews)
                //    .HasForeignKey(d => d.ProductId)
                //    .HasConstraintName("FK_Product_Review");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.CusId)
                    .HasConstraintName("FK_Customer_Review");

                entity.HasOne(d => d.OrderDetail)
                    .WithOne(p => p.Review)
                    .HasForeignKey<Review>(d => d.OdId)
                    .HasConstraintName("FK_OrderDetail_Review");

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

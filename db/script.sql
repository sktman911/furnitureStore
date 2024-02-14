USE [master]
GO
/****** Object:  Database [Furniture]    Script Date: 2/14/2024 10:18:18 PM ******/
CREATE DATABASE [Furniture]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Furniture', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Furniture.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Furniture_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Furniture_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Furniture] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Furniture].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Furniture] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Furniture] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Furniture] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Furniture] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Furniture] SET ARITHABORT OFF 
GO
ALTER DATABASE [Furniture] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Furniture] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Furniture] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Furniture] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Furniture] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Furniture] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Furniture] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Furniture] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Furniture] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Furniture] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Furniture] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Furniture] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Furniture] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Furniture] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Furniture] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Furniture] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Furniture] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Furniture] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Furniture] SET  MULTI_USER 
GO
ALTER DATABASE [Furniture] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Furniture] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Furniture] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Furniture] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Furniture] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Furniture] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Furniture] SET QUERY_STORE = ON
GO
ALTER DATABASE [Furniture] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Furniture]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Color]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Color](
	[color_id] [int] IDENTITY(1,1) NOT NULL,
	[color_name] [nvarchar](50) NULL,
	[color_hexcode] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[color_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[cus_id] [int] IDENTITY(1,1) NOT NULL,
	[cus_name] [nvarchar](100) NULL,
	[cus_phone] [varchar](11) NULL,
	[email] [varchar](100) NULL,
	[cus_address] [nvarchar](100) NULL,
	[doB] [date] NULL,
	[status] [bit] NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](150) NULL,
PRIMARY KEY CLUSTERED 
(
	[cus_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[emp_id] [int] IDENTITY(1,1) NOT NULL,
	[emp_name] [nvarchar](100) NULL,
	[emp_phone] [varchar](11) NULL,
	[email] [varchar](100) NULL,
	[emp_address] [nvarchar](100) NULL,
	[doB] [date] NULL,
	[status] [bit] NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](150) NULL,
	[role_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[emp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Function_]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Function_](
	[function_id] [int] IDENTITY(1,1) NOT NULL,
	[funtion_name] [nvarchar](50) NULL,
	[route] [varchar](50) NULL,
	[icon] [varchar](50) NULL,
	[role_id] [int] NULL,
	[function_title] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[function_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Image](
	[image_id] [int] IDENTITY(1,1) NOT NULL,
	[image_src] [varchar](200) NULL,
	[image_main] [bit] NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[total_price] [float] NULL,
	[total_quantity] [smallint] NULL,
	[order_date] [datetime] NULL,
	[os_id] [int] NULL,
	[om_id] [int] NULL,
	[cus_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[od_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NULL,
	[product_id] [int] NULL,
	[quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[od_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderMethod]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderMethod](
	[om_id] [int] IDENTITY(1,1) NOT NULL,
	[om_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[om_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderStatus]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderStatus](
	[os_id] [int] IDENTITY(1,1) NOT NULL,
	[os_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[os_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [nvarchar](100) NULL,
	[price] [float] NULL,
	[description] [nvarchar](max) NULL,
	[status] [bit] NULL,
	[sale] [bit] NULL,
	[createdDate] [datetime] NULL,
	[subCategory_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Size_Color]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Size_Color](
	[psc_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NULL,
	[size_id] [int] NULL,
	[color_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[psc_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Size]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Size](
	[size_id] [int] IDENTITY(1,1) NOT NULL,
	[size_name] [varchar](5) NULL,
PRIMARY KEY CLUSTERED 
(
	[size_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubCategory]    Script Date: 2/14/2024 10:18:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategory](
	[subCategory_id] [int] IDENTITY(1,1) NOT NULL,
	[subCategory_name] [nvarchar](50) NULL,
	[category_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[subCategory_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([category_id], [category_name]) VALUES (1, N'Dining')
INSERT [dbo].[Category] ([category_id], [category_name]) VALUES (2, N'Living')
INSERT [dbo].[Category] ([category_id], [category_name]) VALUES (3, N'Bedroom')
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Customer] ON 

INSERT [dbo].[Customer] ([cus_id], [cus_name], [cus_phone], [email], [cus_address], [doB], [status], [username], [password]) VALUES (1, N'Đức Giang', N'0932199128', N'chiemducgiang@gmail.com', N'73/1 Văn Thân P.8 Q.6 TP.HCM', CAST(N'2002-06-26' AS Date), 1, N'giang123', N'Giang@123')
SET IDENTITY_INSERT [dbo].[Customer] OFF
GO
SET IDENTITY_INSERT [dbo].[Employee] ON 

INSERT [dbo].[Employee] ([emp_id], [emp_name], [emp_phone], [email], [emp_address], [doB], [status], [username], [password], [role_id]) VALUES (1, N'Giang', N'0932199128', N'chiemducgiang@gmail.com', N'TP.HCM', CAST(N'2002-06-26' AS Date), 1, N'nv123', N'nv@123', 1)
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO
SET IDENTITY_INSERT [dbo].[Function_] ON 

INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (1, N'Employees', N'/admin/employees', N'fas fa-users', 1, N'MANAGEMENT')
INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (2, N'Customers', N'/admin/customers', N'fas fa-user-friends', 1, N'MANAGEMENT')
INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (3, N'Products', N'/admin/products', N'fas fa-couch', 1, N'MANAGEMENT')
INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (4, N'Categories', N'/admin/categories', N'fas fa-list', 1, N'MANAGEMENT')
INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (5, N'SubCategories', N'/admin/subcategories', N'fas fa-list-alt', 1, N'MANAGEMENT')
INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (6, N'Home', N'/admin/home', N'fas fa-home', 1, N'HOME')
INSERT [dbo].[Function_] ([function_id], [funtion_name], [route], [icon], [role_id], [function_title]) VALUES (7, N'Colors', N'/admin/colors', N'fas fa-palette', 1, N'MANAGEMENT')
SET IDENTITY_INSERT [dbo].[Function_] OFF
GO
SET IDENTITY_INSERT [dbo].[Image] ON 

INSERT [dbo].[Image] ([image_id], [image_src], [image_main], [product_id]) VALUES (11, N'banner242439916.png', 1, 4)
INSERT [dbo].[Image] ([image_id], [image_src], [image_main], [product_id]) VALUES (14, N'banner240209215.png', 1, 7)
INSERT [dbo].[Image] ([image_id], [image_src], [image_main], [product_id]) VALUES (15, N'bedroom244853901.png', 1, 8)
INSERT [dbo].[Image] ([image_id], [image_src], [image_main], [product_id]) VALUES (16, N'default_img243247844.png', 1, 9)
INSERT [dbo].[Image] ([image_id], [image_src], [image_main], [product_id]) VALUES (17, N'bedroom243349499.png', 1, 10)
INSERT [dbo].[Image] ([image_id], [image_src], [image_main], [product_id]) VALUES (18, N'_logo242641831.png', 1, 11)
SET IDENTITY_INSERT [dbo].[Image] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([product_id], [product_name], [price], [description], [status], [sale], [createdDate], [subCategory_id]) VALUES (4, N'a', 30, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Product] ([product_id], [product_name], [price], [description], [status], [sale], [createdDate], [subCategory_id]) VALUES (7, N'b', 300000, NULL, NULL, NULL, NULL, 4)
INSERT [dbo].[Product] ([product_id], [product_name], [price], [description], [status], [sale], [createdDate], [subCategory_id]) VALUES (8, N'abc', 40, N'null', NULL, NULL, NULL, 1)
INSERT [dbo].[Product] ([product_id], [product_name], [price], [description], [status], [sale], [createdDate], [subCategory_id]) VALUES (9, N'a', 300000, N'null', NULL, NULL, NULL, 1)
INSERT [dbo].[Product] ([product_id], [product_name], [price], [description], [status], [sale], [createdDate], [subCategory_id]) VALUES (10, N'Aloha', 52, N'null', 1, NULL, NULL, 1)
INSERT [dbo].[Product] ([product_id], [product_name], [price], [description], [status], [sale], [createdDate], [subCategory_id]) VALUES (11, N'ABC', 330000, N'null', 1, NULL, NULL, 2)
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (1, N'AD')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[Size] ON 

INSERT [dbo].[Size] ([size_id], [size_name]) VALUES (1, N'S')
INSERT [dbo].[Size] ([size_id], [size_name]) VALUES (2, N'M')
INSERT [dbo].[Size] ([size_id], [size_name]) VALUES (3, N'L')
SET IDENTITY_INSERT [dbo].[Size] OFF
GO
SET IDENTITY_INSERT [dbo].[SubCategory] ON 

INSERT [dbo].[SubCategory] ([subCategory_id], [subCategory_name], [category_id]) VALUES (1, N'Table', 1)
INSERT [dbo].[SubCategory] ([subCategory_id], [subCategory_name], [category_id]) VALUES (2, N'Chair', 1)
INSERT [dbo].[SubCategory] ([subCategory_id], [subCategory_name], [category_id]) VALUES (4, N'Table', 2)
SET IDENTITY_INSERT [dbo].[SubCategory] OFF
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD FOREIGN KEY([role_id])
REFERENCES [dbo].[Role] ([role_id])
GO
ALTER TABLE [dbo].[Function_]  WITH CHECK ADD FOREIGN KEY([role_id])
REFERENCES [dbo].[Role] ([role_id])
GO
ALTER TABLE [dbo].[Image]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Order_]  WITH CHECK ADD FOREIGN KEY([cus_id])
REFERENCES [dbo].[Customer] ([cus_id])
GO
ALTER TABLE [dbo].[Order_]  WITH CHECK ADD FOREIGN KEY([om_id])
REFERENCES [dbo].[OrderMethod] ([om_id])
GO
ALTER TABLE [dbo].[Order_]  WITH CHECK ADD FOREIGN KEY([os_id])
REFERENCES [dbo].[OrderStatus] ([os_id])
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[Order_] ([order_id])
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD FOREIGN KEY([subCategory_id])
REFERENCES [dbo].[SubCategory] ([subCategory_id])
GO
ALTER TABLE [dbo].[Product_Size_Color]  WITH CHECK ADD FOREIGN KEY([color_id])
REFERENCES [dbo].[Color] ([color_id])
GO
ALTER TABLE [dbo].[Product_Size_Color]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Product_Size_Color]  WITH CHECK ADD FOREIGN KEY([size_id])
REFERENCES [dbo].[Size] ([size_id])
GO
ALTER TABLE [dbo].[SubCategory]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([category_id])
GO
USE [master]
GO
ALTER DATABASE [Furniture] SET  READ_WRITE 
GO

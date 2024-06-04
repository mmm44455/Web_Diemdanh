USE [Api_demo]
GO
/****** Object:  Table [dbo].[dangnhap]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dangnhap](
	[username] [nvarchar](20) NOT NULL,
	[password] [nvarchar](50) NULL,
	[Chucvu] [nvarchar](20) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_dangnhap_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Diemdanh]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Diemdanh](
	[MaSV] [nvarchar](20) NOT NULL,
	[TT] [nchar](10) NULL,
	[time] [nchar](10) NULL,
	[MaLop] [nvarchar](50) NULL,
 CONSTRAINT [PK_Diemdanh] PRIMARY KEY CLUSTERED 
(
	[MaSV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Giaovien]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Giaovien](
	[MaGV] [nvarchar](20) NOT NULL,
	[TenGV] [nvarchar](20) NULL,
	[Email] [nvarchar](50) NULL,
 CONSTRAINT [PK_Teacher] PRIMARY KEY CLUSTERED 
(
	[MaGV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LOPHOCPHAN]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOPHOCPHAN](
	[MaLop] [nvarchar](50) NOT NULL,
	[TenLop] [nvarchar](50) NULL,
 CONSTRAINT [PK_LOPHOCPHAN] PRIMARY KEY CLUSTERED 
(
	[MaLop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MonHoc]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonHoc](
	[MaMon] [nvarchar](20) NOT NULL,
	[TenMon] [nvarchar](50) NULL,
	[HocKy] [nvarchar](50) NULL,
	[Nam] [nvarchar](50) NULL,
 CONSTRAINT [PK_MonHoc] PRIMARY KEY CLUSTERED 
(
	[MaMon] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SinhVien]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SinhVien](
	[MaSV] [nvarchar](20) NOT NULL,
	[name] [nvarchar](50) NULL,
	[date] [date] NULL,
	[gioitinh] [nchar](10) NULL,
	[img] [nvarchar](max) NULL,
	[LopSv] [nvarchar](50) NULL,
	[MaGV] [nvarchar](20) NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[MaSV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SVDIemdanh]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SVDIemdanh](
	[MaSV] [nvarchar](20) NULL,
	[MaLop] [nvarchar](50) NULL,
	[MaMon] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TKB]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TKB](
	[MaMon] [nvarchar](20) NULL,
	[MaLop] [nvarchar](50) NULL,
	[MaGV] [nvarchar](20) NULL,
	[Starttime] [time](7) NULL,
	[EndTime] [time](7) NULL,
	[NgayHoc] [date] NULL,
	[Phong] [nvarchar](50) NULL,
	[MaSV] [nvarchar](20) NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[dangnhap] ON 

INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'admin     ', N'1234', N'admin', 1)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106005', N'271102', N'Sinh vien', 2)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'VK888', N'123456', N'Giao vien', 3)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'VK878', N'12345', N'Giao vien', 4)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106003', N'12345', N'Sinh vien', 5)
SET IDENTITY_INSERT [dbo].[dangnhap] OFF
GO
INSERT [dbo].[Giaovien] ([MaGV], [TenGV], [Email]) VALUES (N'VK878', N'Nguyễn Thị Hương', N'huong@gmail.com')
INSERT [dbo].[Giaovien] ([MaGV], [TenGV], [Email]) VALUES (N'VK888', N'Đỗ Duy Cốp', N'cop@gmail.com')
GO
INSERT [dbo].[LOPHOCPHAN] ([MaLop], [TenLop]) VALUES (N'TEEK23', N'CNPM1')
GO
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [HocKy], [Nam]) VALUES (N'TEE0480', N'Công nghệ phần mềm', N'HK3', N'2023-2024')
GO
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV]) VALUES (N'K205480106003', N'Vu Cong Anh', CAST(N'2002-11-06' AS Date), N'Nam       ', NULL, N'56KMT', N'VK888')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV]) VALUES (N'K205480106005', N'Nguyễn Duy Cao', CAST(N'2002-11-27' AS Date), N'Nam       ', N'https://hnm.1cdn.vn/2023/01/17/hanoimoi.com.vn-uploads-images-tuandiep-2023-01-17-_meo_vang3.jpg', N'56KMT', N'VK888')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV]) VALUES (N'K205480106010', N'Nguyễn thị thảo', CAST(N'2002-05-06' AS Date), N'Nữ        ', NULL, N'56KMT', N'VK888')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV]) VALUES (N'K205480106034', N'Ma Bach Duy ', CAST(N'2002-12-12' AS Date), N'Nam       ', N'https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png', N'56KMT', N'VK888')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV]) VALUES (N'K205480106040', N'Dương Thị Bích Nguyệt', CAST(N'2002-05-06' AS Date), N'Nữ        ', NULL, N'56KMT', N'VK888')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV]) VALUES (N'K205480106051', N'Nguyễn Văn A', CAST(N'2002-07-05' AS Date), N'Nam       ', NULL, N'56CDT', N'VK878')
GO
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A7-104', N'K205480106005')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A7-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-27' AS Date), N'A7-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-22' AS Date), N'A7-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'15:05:00' AS Time), CAST(N'17:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A10-201', N'K205480106051')
GO
ALTER TABLE [dbo].[SinhVien]  WITH CHECK ADD  CONSTRAINT [FK_SinhVien_Giaovien1] FOREIGN KEY([MaGV])
REFERENCES [dbo].[Giaovien] ([MaGV])
GO
ALTER TABLE [dbo].[SinhVien] CHECK CONSTRAINT [FK_SinhVien_Giaovien1]
GO
ALTER TABLE [dbo].[SVDIemdanh]  WITH CHECK ADD  CONSTRAINT [FK_SVDIemdanh_Diemdanh] FOREIGN KEY([MaSV])
REFERENCES [dbo].[Diemdanh] ([MaSV])
GO
ALTER TABLE [dbo].[SVDIemdanh] CHECK CONSTRAINT [FK_SVDIemdanh_Diemdanh]
GO
ALTER TABLE [dbo].[SVDIemdanh]  WITH CHECK ADD  CONSTRAINT [FK_SVDIemdanh_LOPHOCPHAN] FOREIGN KEY([MaLop])
REFERENCES [dbo].[LOPHOCPHAN] ([MaLop])
GO
ALTER TABLE [dbo].[SVDIemdanh] CHECK CONSTRAINT [FK_SVDIemdanh_LOPHOCPHAN]
GO
ALTER TABLE [dbo].[SVDIemdanh]  WITH CHECK ADD  CONSTRAINT [FK_SVDIemdanh_MonHoc] FOREIGN KEY([MaMon])
REFERENCES [dbo].[MonHoc] ([MaMon])
GO
ALTER TABLE [dbo].[SVDIemdanh] CHECK CONSTRAINT [FK_SVDIemdanh_MonHoc]
GO
ALTER TABLE [dbo].[SVDIemdanh]  WITH CHECK ADD  CONSTRAINT [FK_SVDIemdanh_SinhVien] FOREIGN KEY([MaSV])
REFERENCES [dbo].[SinhVien] ([MaSV])
GO
ALTER TABLE [dbo].[SVDIemdanh] CHECK CONSTRAINT [FK_SVDIemdanh_SinhVien]
GO
ALTER TABLE [dbo].[TKB]  WITH CHECK ADD  CONSTRAINT [FK_TKB_Giaovien] FOREIGN KEY([MaGV])
REFERENCES [dbo].[Giaovien] ([MaGV])
GO
ALTER TABLE [dbo].[TKB] CHECK CONSTRAINT [FK_TKB_Giaovien]
GO
ALTER TABLE [dbo].[TKB]  WITH CHECK ADD  CONSTRAINT [FK_TKB_LOPHOCPHAN] FOREIGN KEY([MaLop])
REFERENCES [dbo].[LOPHOCPHAN] ([MaLop])
GO
ALTER TABLE [dbo].[TKB] CHECK CONSTRAINT [FK_TKB_LOPHOCPHAN]
GO
ALTER TABLE [dbo].[TKB]  WITH CHECK ADD  CONSTRAINT [FK_TKB_MonHoc] FOREIGN KEY([MaMon])
REFERENCES [dbo].[MonHoc] ([MaMon])
GO
ALTER TABLE [dbo].[TKB] CHECK CONSTRAINT [FK_TKB_MonHoc]
GO
ALTER TABLE [dbo].[TKB]  WITH CHECK ADD  CONSTRAINT [FK_TKB_SinhVien] FOREIGN KEY([MaSV])
REFERENCES [dbo].[SinhVien] ([MaSV])
GO
ALTER TABLE [dbo].[TKB] CHECK CONSTRAINT [FK_TKB_SinhVien]
GO
/****** Object:  StoredProcedure [dbo].[GetUserInformation]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserInformation]
    @Username NVARCHAR(50)
AS
BEGIN
    SELECT 
        'SinhVien' AS UserType,
        sv.MaSV AS ID,
        sv.name AS UserName,
        NULL AS Email,
		sv.gioitinh AS Role,
		sv.LopSv AS Class,
		sv.date AS Date,
        gv.TenGv AS ClassTeacher,
		null as Lop
    FROM SinhVien sv
    LEFT JOIN Giaovien gv ON sv.MaGv = gv.MaGV
    WHERE sv.MaSV = @Username
    UNION ALL
    SELECT 
        'Giaovien' AS UserType,
        gv.MaGV AS ID,
        gv.TenGv AS UserName,
        gv.Email AS Email,
		null AS Role,
		null AS Class,
		null AS Date,
        null AS ClassTeacher,
		null as Lop
    FROM Giaovien gv
    WHERE gv.MaGV = @Username
	

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTKB]    Script Date: 04/06/2024 11:18:25 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetTKB]
    @Username NVARCHAR(50)
AS
BEGIN
    

    DECLARE @UserType  NVARCHAR(50)

    -- Giả sử bạn có bảng Users để xác định loại người dùng
    SELECT @UserType = Chucvu
    FROM dangnhap
    WHERE Username = @Username;

    IF @UserType = 'Giao vien'
    BEGIN
        -- Thời khóa biểu cho giáo viên
       SELECT DISTINCT TKB.MaMon, MonHoc.TenMon, Giaovien.TenGV, TKB.StartTime, TKB.EndTime, TKB.NgayHoc, TKB.Phong,SinhVien.LopSv
        FROM TKB
		JOIN SinhVien on TKB.MaSV = SinhVien.MaSV
        JOIN MonHoc ON TKB.MaMon = MonHoc.MaMon
        JOIN Giaovien ON TKB.MaGV = Giaovien.MaGV
        WHERE Giaovien.MaGV = @Username
       
    END
    ELSE IF @UserType = 'Sinh vien' 
    BEGIN
        -- Thời khóa biểu cho sinh viên
        SELECT TKB.MaMon, MonHoc.TenMon, Giaovien.TenGV, TKB.StartTime, TKB.EndTime, TKB.NgayHoc, TKB.Phong,SinhVien.LopSv
        FROM TKB
        JOIN MonHoc ON TKB.MaMon = MonHoc.MaMon
        JOIN SinhVien ON SinhVien.MaSV = TKB.MaSV
        JOIN Giaovien ON TKB.MaGV = Giaovien.MaGV
        WHERE SinhVien.MaSV = @Username
          
    END
END;
GO

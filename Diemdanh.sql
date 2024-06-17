USE [Api_demo]
GO
/****** Object:  Table [dbo].[dangnhap]    Script Date: 17/06/2024 11:27:03 am ******/
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
/****** Object:  Table [dbo].[Diemdanh]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Diemdanh](
	[MaSV] [nvarchar](20) NOT NULL,
	[TT] [nchar](10) NULL,
	[time] [datetime] NOT NULL,
	[MaLop] [nvarchar](50) NULL,
	[MaMon] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Giaovien]    Script Date: 17/06/2024 11:27:04 am ******/
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
/****** Object:  Table [dbo].[LOPHOCPHAN]    Script Date: 17/06/2024 11:27:04 am ******/
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
/****** Object:  Table [dbo].[MonHoc]    Script Date: 17/06/2024 11:27:04 am ******/
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
/****** Object:  Table [dbo].[SinhVien]    Script Date: 17/06/2024 11:27:04 am ******/
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
	[email] [nvarchar](50) NULL,
	[Khoa] [nvarchar](50) NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[MaSV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TKB]    Script Date: 17/06/2024 11:27:04 am ******/
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
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106002', N'145678', N'Sinh viên', 114)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106005', N'123487', N'Sinh vien', 116)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106011', N'123456', N'Sinh vien', 118)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106034', N'123456', N'Sinh vien', 120)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106040', N'123456', N'Sinh vien', 121)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106003', N'123456', N'Sinh vien', 122)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'VK888', N'145678', N'Giao vien', 132)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'VK878', N'1234567', N'Giao vien', 133)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106035', N'234567', N'Sinh viên', 134)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205510205187', N'123456', N'Sinh vien', 135)
INSERT [dbo].[dangnhap] ([username], [password], [Chucvu], [id]) VALUES (N'K205480106023', N'1234567', N'Sinh vien', 136)
SET IDENTITY_INSERT [dbo].[dangnhap] OFF
GO
INSERT [dbo].[Diemdanh] ([MaSV], [TT], [time], [MaLop], [MaMon]) VALUES (N'K205480106003', N'0         ', CAST(N'2024-05-28T13:05:00.000' AS DateTime), N'TEEK23', N'TEE0480')
INSERT [dbo].[Diemdanh] ([MaSV], [TT], [time], [MaLop], [MaMon]) VALUES (N'K205480106005', N'0         ', CAST(N'2024-05-28T13:00:00.000' AS DateTime), N'TEEK23', N'TEE0480')
INSERT [dbo].[Diemdanh] ([MaSV], [TT], [time], [MaLop], [MaMon]) VALUES (N'K205480106003', N'0         ', CAST(N'2024-05-27T13:05:00.000' AS DateTime), N'TEEK23', N'TEE0480')
INSERT [dbo].[Diemdanh] ([MaSV], [TT], [time], [MaLop], [MaMon]) VALUES (N'K205480106003', N'0         ', CAST(N'2024-05-22T13:10:00.000' AS DateTime), N'TEEK23', N'TEE0480')
INSERT [dbo].[Diemdanh] ([MaSV], [TT], [time], [MaLop], [MaMon]) VALUES (N'K205480106005', N'0         ', CAST(N'2024-06-16T18:15:09.000' AS DateTime), N'TEEK21', N'TEE0478')
GO
INSERT [dbo].[Giaovien] ([MaGV], [TenGV], [Email]) VALUES (N'VK878', N'Nguyễn Thị Hương', N'huong@tnut.edu.vn')
INSERT [dbo].[Giaovien] ([MaGV], [TenGV], [Email]) VALUES (N'VK888', N'Đỗ Duy Cốp', N'duycop@tnut.edu.vn
')
GO
INSERT [dbo].[LOPHOCPHAN] ([MaLop], [TenLop]) VALUES (N'TEEK21', N'KHDL')
INSERT [dbo].[LOPHOCPHAN] ([MaLop], [TenLop]) VALUES (N'TEEK22', N'PYTHON1')
INSERT [dbo].[LOPHOCPHAN] ([MaLop], [TenLop]) VALUES (N'TEEK23', N'CNPM1')
INSERT [dbo].[LOPHOCPHAN] ([MaLop], [TenLop]) VALUES (N'TEEK24', N'CNPM2')
GO
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [HocKy], [Nam]) VALUES (N'TEE0478', N'Khoa học dữ liệu', N'HK3', N'2023-2024')
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [HocKy], [Nam]) VALUES (N'TEE0479', N'Lập trình Python', N'HK3', N'2023-2024')
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [HocKy], [Nam]) VALUES (N'TEE0480', N'Công nghệ phần mềm', N'HK3', N'2023-2024')
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [HocKy], [Nam]) VALUES (N'TEE597', N'Trí tuệ nhân tạo', N'HK2', N'2023-2024')
GO
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106003', N'Vũ Công Anh', CAST(N'2002-11-06' AS Date), N'Nam       ', NULL, N'56KMT', N'VK888', N'K205480106003@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106005', N'Nguyễn Duy Cao', CAST(N'2002-10-27' AS Date), N'Nam       ', N'https://hnm.1cdn.vn/2023/01/17/hanoimoi.com.vn-uploads-images-tuandiep-2023-01-17-_meo_vang3.jpg', N'56KMT', N'VK888', N'K205480106005@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106011', N'Phương Minh Duy', CAST(N'2002-01-01' AS Date), N'Nam       ', NULL, N'56KMT', N'VK888', N'K205480106011@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106023', N'Hoàng Đức Chung', CAST(N'2002-06-27' AS Date), N'Nam       ', NULL, N'56KMT', N'VK888', N'K205480106023@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106034', N'Ma Bach Duy ', CAST(N'2002-12-12' AS Date), N'Nam       ', N'https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png', N'56KMT', N'VK888', N'K205480106034@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106035', N'Vũ Ngọc Trang', CAST(N'2002-01-01' AS Date), N'Nam       ', NULL, N'56KMT', N'VK888', N'K205480106035@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106040', N'Dương Thị Bích Nguyệt', CAST(N'2002-05-06' AS Date), N'Nữ        ', NULL, N'56KMT', N'VK888', N'K205480106040@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205480106051', N'Nguyễn Văn A', CAST(N'2002-07-05' AS Date), N'Nam       ', NULL, N'56CDT', N'VK878', N'K205480106051@tnut.edu.vn', N'Điện tử')
INSERT [dbo].[SinhVien] ([MaSV], [name], [date], [gioitinh], [img], [LopSv], [MaGV], [email], [Khoa]) VALUES (N'K205510205187', N'Trần Học Thái', CAST(N'2002-07-14' AS Date), N'Nam       ', NULL, N'56KMT', N'VK888', N'K205510205187@tnut.edu.vn', N'Điện tử')
GO
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A7-104', N'K205480106005')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A7-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-27' AS Date), N'A7-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-22' AS Date), N'A7-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK24', N'VK878', CAST(N'15:05:00' AS Time), CAST(N'17:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A10-201', N'K205480106051')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0480', N'TEEK23', N'VK878', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-28' AS Date), N'A7-104', N'K205480106034')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0479', N'TEEK22', N'VK888', CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), CAST(N'2024-05-29' AS Date), N'A7-104', N'K205480106005')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0478', N'TEEK21', N'VK888', CAST(N'07:00:00' AS Time), CAST(N'09:00:00' AS Time), CAST(N'2024-05-30' AS Date), N'A8-104', N'K205480106005')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0478', N'TEEK21', N'VK888', CAST(N'07:00:00' AS Time), CAST(N'09:00:00' AS Time), CAST(N'2024-05-30' AS Date), N'A8-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0478', N'TEEK21', N'VK888', CAST(N'07:00:00' AS Time), CAST(N'09:00:00' AS Time), CAST(N'2024-06-12' AS Date), N'A8-104', N'K205480106003')
INSERT [dbo].[TKB] ([MaMon], [MaLop], [MaGV], [Starttime], [EndTime], [NgayHoc], [Phong], [MaSV]) VALUES (N'TEE0478', N'TEEK21', N'VK888', CAST(N'13:00:00' AS Time), CAST(N'19:00:00' AS Time), CAST(N'2024-06-16' AS Date), N'A8-2024', N'K205480106005')
GO
ALTER TABLE [dbo].[Diemdanh]  WITH CHECK ADD  CONSTRAINT [FK_Diemdanh_LOPHOCPHAN] FOREIGN KEY([MaLop])
REFERENCES [dbo].[LOPHOCPHAN] ([MaLop])
GO
ALTER TABLE [dbo].[Diemdanh] CHECK CONSTRAINT [FK_Diemdanh_LOPHOCPHAN]
GO
ALTER TABLE [dbo].[Diemdanh]  WITH CHECK ADD  CONSTRAINT [FK_Diemdanh_MonHoc] FOREIGN KEY([MaMon])
REFERENCES [dbo].[MonHoc] ([MaMon])
GO
ALTER TABLE [dbo].[Diemdanh] CHECK CONSTRAINT [FK_Diemdanh_MonHoc]
GO
ALTER TABLE [dbo].[Diemdanh]  WITH CHECK ADD  CONSTRAINT [FK_Diemdanh_SinhVien] FOREIGN KEY([MaSV])
REFERENCES [dbo].[SinhVien] ([MaSV])
GO
ALTER TABLE [dbo].[Diemdanh] CHECK CONSTRAINT [FK_Diemdanh_SinhVien]
GO
ALTER TABLE [dbo].[SinhVien]  WITH CHECK ADD  CONSTRAINT [FK_SinhVien_Giaovien1] FOREIGN KEY([MaGV])
REFERENCES [dbo].[Giaovien] ([MaGV])
GO
ALTER TABLE [dbo].[SinhVien] CHECK CONSTRAINT [FK_SinhVien_Giaovien1]
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
/****** Object:  StoredProcedure [dbo].[AttendanceStudent]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Nguyen Duy Cao
-- Create date: 5/6/2024
-- Description:	List dien danh
-- =============================================
CREATE PROCEDURE [dbo].[AttendanceStudent] 
	-- Add the parameters for the stored procedure here
	@MaMon nvarchar(20),
	@Starttime time,
	@date date,
	@MaLop nvarchar(20)
AS
BEGIN
	SELECT 
    TKB.MaSV, 
    SinhVien.name, 
	SinhVien.gioitinh,
	SinhVien.LopSv,
    TKB.NgayHoc, 
    Diemdanh.time AS ThoiGianDen,
    CASE 
        WHEN Diemdanh.TT = 0 THEN 'Có'
        WHEN Diemdanh.TT = 1 THEN 'Absent'
        ELSE 'No attendance yet' 
    END AS TrangThaiDiemDanh
FROM 
    TKB
INNER JOIN 
    SinhVien ON TKB.MaSV = SinhVien.MaSV
INNER JOIN 
    MonHoc ON TKB.MaMon = MonHoc.MaMon
INNER JOIN 
    LOPHOCPHAN ON TKB.MaLop = LOPHOCPHAN.MaLop
LEFT JOIN 
    Diemdanh ON TKB.MaSV = Diemdanh.MaSV 
             AND TKB.MaMon = Diemdanh.MaMon 
             AND CAST(Diemdanh.time AS DATE) = TKB.NgayHoc
WHERE 
    TKB.NgayHoc = @date 
    AND TKB.Starttime = @Starttime and MonHoc.MaMon = @MaMon
	and LOPHOCPHAN.MaLop = @MaLop

END
GO
/****** Object:  StoredProcedure [dbo].[ClassTeacher]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Nguyen Duy Cao
-- Create date: 6/6/2024
-- Description:	Lop chu nhiem
-- =============================================
CREATE PROCEDURE [dbo].[ClassTeacher]
    @MaGV nvarchar(20),
    @HocKy nvarchar(10),
    @Nam nvarchar(30)
AS
BEGIN
    SET NOCOUNT ON;

    -- CTE để tính số buổi học
    WITH SoBuoiHoc AS (
        SELECT 
            TKB.MaMon, 
            SinhVien.MaSV, 
            SinhVien.name, 
            MonHoc.HocKy,
            MonHoc.Nam,
			 MonHoc.TenMon,
            COUNT(TKB.MaMon) AS SoBuoiHoc
        FROM 
            SinhVien
         LEFT JOIN 
            TKB ON SinhVien.MaSV = TKB.MaSV
          LEFT JOIN 
            MonHoc ON MonHoc.MaMon = TKB.MaMon
         LEFT JOIN 
            Giaovien ON SinhVien.MaGV = Giaovien.MaGV
        WHERE 
            Giaovien.MaGV = @MaGV
            AND (MonHoc.HocKy = @HocKy OR MonHoc.HocKy IS NULL)
            AND (MonHoc.Nam = @Nam OR MonHoc.Nam IS NULL)
        GROUP BY 
            TKB.MaMon, SinhVien.MaSV, SinhVien.name, MonHoc.HocKy, MonHoc.Nam, MonHoc.TenMon
    ),
    -- CTE để tính số buổi điểm danh
    SoBuoiDiemDanh AS (
        SELECT 
            Diemdanh.MaMon,
            Diemdanh.MaSV, 
            MonHoc.HocKy,
            COUNT(Diemdanh.TT) AS SoBuoiDiemDanh
        FROM 
            Diemdanh 
        JOIN 
            MonHoc ON Diemdanh.MaMon = MonHoc.MaMon
        WHERE 
            MonHoc.HocKy = @HocKy
            AND MonHoc.Nam = @Nam
        GROUP BY 
            Diemdanh.MaMon, Diemdanh.MaSV, MonHoc.HocKy, MonHoc.Nam
    ),
    -- Kết hợp dữ liệu số buổi học và số buổi điểm danh
    Combined AS (
        SELECT 
            SoBuoiHoc.MaSV, 
            SoBuoiHoc.name, 
            SoBuoiHoc.MaMon, 
            SoBuoiHoc.SoBuoiHoc,
            SoBuoiHoc.HocKy,
			 SoBuoiHoc.TenMon,
            SoBuoiHoc.Nam,
            COALESCE(SoBuoiDiemDanh.SoBuoiDiemDanh, 0) AS SoBuoiDiemDanh
        FROM 
            SoBuoiHoc
        LEFT JOIN 
            SoBuoiDiemDanh ON SoBuoiHoc.MaSV = SoBuoiDiemDanh.MaSV 
                            AND SoBuoiHoc.MaMon = SoBuoiDiemDanh.MaMon 
                            AND SoBuoiHoc.HocKy = SoBuoiDiemDanh.HocKy
    )
    -- Nhóm dữ liệu theo sinh viên và ghép các môn học thành một cột duy nhất
   SELECT 
    MaSV,
    name,
    HocKy,
    Nam,
    STRING_AGG(
        CONCAT(
            'TenMon : ', ISNULL(TenMon, 'N/A'), '|', 
            ' MaMon :', ISNULL(MaMon, 'N/A'), '|', 
            ' BuoiHoc : ', ISNULL(CAST(SoBuoiHoc AS nvarchar), '0'), '|', 
            'DiemDanh : ', 
            CASE 
                WHEN SoBuoiDiemDanh IS NULL THEN 'Không đi học'
                ELSE CAST(SoBuoiDiemDanh AS nvarchar)
            END,
            '|'
        ), '; '
    ) AS MonHocDetails
FROM 
    Combined
GROUP BY 
    MaSV, name, HocKy, Nam
ORDER BY 
    MaSV;


END

GO
/****** Object:  StoredProcedure [dbo].[CRUDStuTea]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: 15/6/2024
-- Description:	Them sua xoa sinh vien va giao vien
-- =============================================
CREATE PROCEDURE [dbo].[CRUDStuTea] 
	-- Add the parameters for the stored procedure here
	@name nvarchar(50),
	@date nvarchar(10),
	@role nvarchar(5),
	@email nvarchar(50),
	@ObjectType NVARCHAR(50),
	@Operation NVARCHAR(50),
	@MaSV nvarchar(20),
	@MaGV nvarchar(20),
	@Khoa nvarchar(50),
	@LopSV nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

		IF @ObjectType = 'Sinh vien'
		BEGIN
		IF @Operation = 'insert'
		BEGIN
			INSERT INTO SinhVien(name, gioitinh, date,MaSV,Khoa,LopSv,MaGV,email)
			VALUES (@name, @role, @date,@MaSV,@Khoa,@LopSv,@MaGV,@email);
		END
		ELSE IF @Operation = 'update'
		BEGIN
			UPDATE SinhVien
			SET name = @name, gioitinh = @role,date =@date
			WHERE MaSV = @MaSV
		END
		ELSE IF @Operation = 'delete'
		BEGIN
			DELETE FROM Diemdanh WHERE MaSV =@MaSV
			Delete from TKB where TKB.MaSV = @MaSV
			Delete from dangnhap where username =@MaSV
			DELETE FROM SinhVien
			WHERE MaSV =@MaSV
			
		END
	END
	ELSE IF @ObjectType = 'Giao vien'
	BEGIN
		IF @Operation = 'insert'
		BEGIN
			INSERT INTO Giaovien(MaGV, Email, TenGV)
			VALUES (@MaGV, @email, @name);
		END
		ELSE IF @Operation = 'update'
		BEGIN
			UPDATE Giaovien
			SET TenGV = @name, Email = @email
			WHERE MaGV = @MaGV
		END
		ELSE IF @Operation = 'delete'
		BEGIN
			DELETE FROM Giaovien
			WHERE MaGV = @MaGV;
		END
	END
	ELSE
	BEGIN
		RAISERROR('Invalid ObjectType or Operation', 16, 1);
	END
   
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserInformation]    Script Date: 17/06/2024 11:27:04 am ******/
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
        sv.email AS Email,
		sv.gioitinh AS Role,
		sv.LopSv AS Class,
		sv.date AS Date,
		sv.img As img,
        gv.TenGv AS ClassTeacher,
		null as Lop,
		sv.Khoa as Khoa
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
		null as img,
        null AS ClassTeacher,
		null as Lop,
		null as Khoa
    FROM Giaovien gv
    WHERE gv.MaGV = @Username
	

END
GO
/****** Object:  StoredProcedure [dbo].[HocKy]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[HocKy]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select HocKy,Nam from MonHoc 
   Group by HocKy,Nam
END
GO
/****** Object:  StoredProcedure [dbo].[IntoLogin]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[IntoLogin]
	@username nvarchar(50),
	@password nvarchar(20),
	@Chucvu nvarchar(10),
	 @Action nvarchar(10)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
 IF @Action = 'INSERT'
    BEGIN
        -- Thêm mới dữ liệu
        INSERT INTO dangnhap (username, password, Chucvu) 
        VALUES (@username, @password, @Chucvu);
    END
    ELSE IF @Action = 'UPDATE'
    BEGIN
        -- Cập nhật dữ liệu
        UPDATE dangnhap
        SET password = @password,
            Chucvu = @Chucvu
        WHERE username = @username;
    END
    ELSE IF @Action = 'DELETE'
    BEGIN
        -- Xóa dữ liệu
        DELETE FROM dangnhap
        WHERE username = @username;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[Khoa]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Nguyen duy cao
-- Create date: 13/6/2024
-- Description:	Danh sach khoa 
-- =============================================
CREATE PROCEDURE [dbo].[Khoa] 
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select Khoa , LopSv from SinhVien 
		Group by Khoa,LopSv
END
GO
/****** Object:  StoredProcedure [dbo].[ListStudent]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ListStudent]
	@MaGV nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select MaSV,name,gioitinh,date,LopSv,img,SUBSTRING(name, CHARINDEX(' ', name) + 1, LEN(name)) AS Ten
   from SinhVien join Giaovien on SinhVien.MaGV = Giaovien.MaGV
where SinhVien.MaGV = @MaGV
ORDER BY 
    Ten
END
GO
/****** Object:  StoredProcedure [dbo].[ListSubjectTeacher]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Name>
-- Create date: <Create Date>
-- Description:	<Description>
-- =============================================
CREATE PROCEDURE [dbo].[ListSubjectTeacher]
    @MaMon NVARCHAR(20),
    @MaLop NVARCHAR(20),
    @MaGV NVARCHAR(20),
    @Nam NVARCHAR(20),
    @HocKy NVARCHAR(10)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

    WITH DiemDanhCTE AS (
        SELECT 
            DiemDanh.MaMon,
            DiemDanh.MaSV,
            DiemDanh.MaLop,
            LOPHOCPHAN.TenLop,
            SinhVien.name,
            COUNT(TT) AS BuoiDiemdanh
        FROM 
            DiemDanh
        JOIN 
            SinhVien ON SinhVien.MaSV = DiemDanh.MaSV 
        JOIN 
            LOPHOCPHAN ON DiemDanh.MaLop = LOPHOCPHAN.MaLop
        WHERE 
            DiemDanh.MaMon = @MaMon AND DiemDanh.MaLop = @MaLop
        GROUP BY 
            DiemDanh.MaMon, DiemDanh.MaSV, SinhVien.name, DiemDanh.MaLop, LOPHOCPHAN.TenLop
    ), 
    HocKyCTE AS (
        SELECT 
            TKB.MaMon, 
            TKB.MaSV, 
            SinhVien.name, 
            MonHoc.HocKy,
            MonHoc.Nam,
            MonHoc.TenMon,
            COUNT(TKB.MaMon) AS SoBuoiHoc
        FROM 
            SinhVien
        JOIN 
            TKB ON SinhVien.MaSV = TKB.MaSV
        JOIN 
            MonHoc ON MonHoc.MaMon = TKB.MaMon
        JOIN 
            Giaovien ON SinhVien.MaGV = Giaovien.MaGV
        WHERE 
            TKB.MaMon = @MaMon
            AND TKB.MaLop = @MaLop
            AND TKB.MaGV = @MaGV
            AND MonHoc.HocKy = @HocKy
            AND MonHoc.Nam = @Nam
        GROUP BY 
            TKB.MaMon, TKB.MaSV, SinhVien.name, MonHoc.HocKy, MonHoc.Nam, MonHoc.TenMon
    )
    SELECT 
        H.MaMon,
        H.MaSV,
        H.name,
        H.TenMon,
        H.HocKy,
        H.Nam,
        H.SoBuoiHoc,
        D.BuoiDiemdanh
    FROM 
        HocKyCTE H
    LEFT JOIN 
        DiemDanhCTE D ON H.MaSV = D.MaSV AND H.MaMon = D.MaMon;
END
GO
/****** Object:  StoredProcedure [dbo].[showStudent]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Danh sach sinh vien co va chua co tai khoan
-- =============================================
CREATE PROCEDURE [dbo].[showStudent]
	@LopSv nvarchar(50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select * from SinhVien left join 
	dangnhap on SinhVien.MaSV = dangnhap.username 
	where LopSv = @LopSv 

END
GO
/****** Object:  StoredProcedure [dbo].[sp_DiemDanhSinhVien]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DiemDanhSinhVien]
    @MaSV NVARCHAR(50),
    @MaLop NVARCHAR(50),
	@MaMon NVarchar(20),
    @ThoiGianDiemDanh DATETIME,
    @ThoiGianBatDau DATETIME,
    @ThoiGianKetThuc DATETIME
AS
BEGIN
    SET NOCOUNT ON;
	 

    -- Kiểm tra xem sinh viên đã điểm danh chưa
    IF NOT EXISTS (
        SELECT 1 
        FROM Diemdanh 
        WHERE MaSV = @MaSV 
        AND MaLop = @MaLop 
        AND MaMon = @MaMon 
    )
    BEGIN
        -- Kiểm tra xem thời gian điểm danh nằm trong khoảng thời gian môn học
        IF @ThoiGianDiemDanh >= @ThoiGianBatDau AND @ThoiGianDiemDanh <= @ThoiGianKetThuc
        BEGIN
            -- Chưa điểm danh, thêm mới bản ghi
            INSERT INTO Diemdanh (MaSV, MaLop, time, TT, MaMon)
            VALUES (@MaSV, @MaLop, @ThoiGianDiemDanh, '0', @MaMon);

            -- Trả về thông báo đã điểm danh thành công
            SELECT 'Attendance has been taken' AS Message;
        END
        ELSE
        BEGIN
            -- Thời gian điểm danh không hợp lệ
            SELECT 'Attendance time is not within the course time period' AS Message;
        END
    END
    ELSE
    BEGIN
        SELECT 'Students have taken attendance' AS Message;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTKB]    Script Date: 17/06/2024 11:27:04 am ******/
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
       SELECT DISTINCT TKB.MaMon, MonHoc.TenMon, Giaovien.TenGV, TKB.StartTime, TKB.EndTime, TKB.NgayHoc, TKB.Phong,SinhVien.LopSv,TKB.MaLop,LOPHOCPHAN.TenLop
        FROM TKB
		JOIN SinhVien on TKB.MaSV = SinhVien.MaSV
        JOIN MonHoc ON TKB.MaMon = MonHoc.MaMon
        JOIN Giaovien ON TKB.MaGV = Giaovien.MaGV
		Join LOPHOCPHAN on TKB.MaLop = LOPHOCPHAN.MaLop
        WHERE Giaovien.MaGV = @Username
       
    END
    ELSE IF @UserType = 'Sinh vien' 
    BEGIN
        -- Thời khóa biểu cho sinh viên
        SELECT TKB.MaMon, MonHoc.TenMon, Giaovien.TenGV, TKB.StartTime, TKB.EndTime, TKB.NgayHoc, TKB.Phong,SinhVien.LopSv,TKB.MaLop,LOPHOCPHAN.TenLop
        FROM TKB
        JOIN MonHoc ON TKB.MaMon = MonHoc.MaMon
        JOIN SinhVien ON SinhVien.MaSV = TKB.MaSV
        JOIN Giaovien ON TKB.MaGV = Giaovien.MaGV
				Join LOPHOCPHAN on TKB.MaLop = LOPHOCPHAN.MaLop
        WHERE SinhVien.MaSV = @Username
          
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SubjectTeacher]    Script Date: 17/06/2024 11:27:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SubjectTeacher]
	@MaGv nvarchar(20),
	@HocKy nvarchar(10),
	@Nam nvarchar(20)
AS
BEGIN
	
	SET NOCOUNT ON;

   select TenMon,TKB.MaMon,LOPHOCPHAN.MaLop,LOPHOCPHAN.TenLop from MonHoc 
join TKB on MonHoc.MaMon = TKB.MaMon
join LOPHOCPHAN on TKB.MaLop = LOPHOCPHAN.MaLop
where TKB.MaGV = @MaGv and MonHoc.HocKy = @HocKy and Nam = @Nam
group by TenMon,TKB.MaMon,LOPHOCPHAN.MaLop,LOPHOCPHAN.TenLop
END
GO

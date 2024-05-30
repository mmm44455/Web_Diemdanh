@app.get("/get-tkb/")
async def get_tkb(username: str, hocky: str):
    try:
        
        # Kết nối tới cơ sở dữ liệu
        connection = connect_to_database()
        cursor = connection.cursor()
        # Thực hiện stored procedure
        cursor.execute("EXEC sp_GetTKB @Username = ?, @HocKy = ?", (username, hocky))

        # Lấy kết quả từ stored procedure
        rows = cursor.fetchall()

        # Chuyển đổi kết quả thành dạng list của các dictionary
        tkb_list = []
        for row in rows:
            tkb_dict = {
                "MaMon": row[0],
                "TenMon": row[1],
                "TenGV": row[2],
                "StartTime": row[3].strftime(" %H:%M:%S"),
                "EndTime": row[4].strftime("%H:%M:%S"),
                "NgayHoc": row[5].strftime("%Y-%m-%d"),
                "Phong": row[6]
            }
            tkb_list.append(tkb_dict)

        # Đóng kết nối
        connection.close()

        # Trả về danh sách thời khóa biểu dưới dạng JSON
        return tkb_list
    except Exception as e:
        # Nếu có lỗi, trả về lỗi 500 và thông báo lỗi
        raise HTTPException(status_code=500, detail=str(e))


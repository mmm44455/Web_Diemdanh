 try:
        # Connect to database
        connection = connect_to_database()
        cursor = connection.cursor()

        # Execute stored procedure
        cursor.execute("EXEC sp_DiemDanhSinhVien @MaSV = ?, @MaMon = ?, @MaLop = ?, @ThoiGianDiemDanh = ?, @ThoiGianBatDau = ?, @ThoiGianKetThuc = ?", MaSV, MaMon, MaLop, TimeAtt, Starttime, EndTime)
        connection.commit()

        # Check for any rows returned
        rows = cursor.fetchall()

        if row:
            message = rows[0][0]
            return {"Message": message}
        else:
            return {"Message": "Không có dữ liệu trả về"}

    except pyodbc.Error as e:
        print(f"SQL execution error: {e}")
        raise

    finally:
        # Ensure cursor and connection are closed in all cases
        cursor.close()
        connection.close()
@app.get("/liststudent/",response_model=List[AttendanceRecord])
async def get_atten(MaGV:str):
    try:
            connection = connect_to_database()
            cursor = connection.cursor()
            # Call the stored procedure
            cursor.execute("exec ListStudent @MaGV = ?", MaGV)
            listStudnet=[]
            # Fetch all the results
            rows = cursor.fetchall()
            for row in rows:
                print(row)
                listStu = {
                       "MaSV" : row[0],
                       "name": row[1],
                       "gioitinh":row[2],
                       "date" : row[3],
                       "LopSv":row[4],
                       "img":row[5] 
                }
                listStudnet.append(listStu)
            connection.close()
            return listStudnet
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
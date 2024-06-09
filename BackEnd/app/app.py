from fastapi import FastAPI, HTTPException, Request
from typing import Optional, List
import pyodbc
import jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

SECRET_KEY = "duycao12"
TOKEN_EXPIRE_MINUTES = 30

class User:
    def __init__(self, username: str, password: str,role:str):
        self.username = username
        self.password = password
        self.role = role
class SinhVien(BaseModel):
    MaSv: str
    name: str
    date: str
    lop: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Cho phép các phương thức yêu cầu
    allow_headers=["*"],  # Cho phép tất cả các tiêu đề
)

def connect_to_database():
    return pyodbc.connect('DRIVER={SQL Server};'
                          'SERVER=DUYCAO;'
                          'DATABASE=Api_demo;'
                          'UID=sa;'
                          'PWD=123456')


def get_user_by_username(username: str) -> Optional[User]:
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("SELECT username, password,Chucvu FROM dangnhap WHERE username = ?", (username,))
    row = cursor.fetchone()
    print("du lieu",row)
    connection.close()
    if row:
        return User(username=row[0], password=row[1],role=row[2])
    else:
        return None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

# API để đăng nhập
@app.post("/login/")
async def login(request: Request):
    body = await request.json()
    print(f"Received data: {body}")
    
    username = body.get("username")
    password = body.get("password")
    
    user = get_user_by_username(username)
    if user and user.password == password:
        # Tạo token khi đăng nhập thành công
        access_token = create_access_token(data={"sub": username})
        return {"token": access_token,"username":username,"role":user.role}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
# API để lấy thông tin người dùng
@app.get("/user-info/")
async def get_user_info(username: str):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("EXEC GetUserInformation ?", (username,))
    rows = cursor.fetchall()
    connection.close()
    if not rows:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_info = {}
    for row in rows:
        user_type = row[0]
        user_info["UserType"] = user_type
        if user_type == "SinhVien":
            user_info["ID"] = row[1]
            user_info["UserName"] = row[2]
            user_info["Email"] = row[3]
            user_info["Role"] = row[4]
            user_info["Class"] = row[5]
            user_info["Date"] = row[6]
            user_info["ClassTeacher"] = row[7]
            user_info["StudentClass"] = row[8]
        elif user_type == "Giaovien":
            user_info["ID"] = row[1]
            user_info["UserName"] = row[2]
            user_info["Email"] = row[3]
            user_info["Role"] = row[4]
            user_info["Class"] = row[5]
            user_info["Date"] = row[6]
            user_info["ClassTeacher"] = row[7]
            user_info["StudentClass"] = row[8]
        elif user_type == "Admin":
            user_info["ID"] = row[1]
            user_info["UserName"] = row[2]
            user_info["Role"] = "admin"
    
    return user_info

    user = call_get_user_information_procedure(username)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")
@app.get("/get-tkb/")
async def get_tkb(username: str):
    try:
        # Kết nối tới cơ sở dữ liệu
        connection = connect_to_database()
        cursor = connection.cursor()
        
        # Thực hiện stored procedure
        cursor.execute("EXEC sp_GetTKB ?", (username,))

        # Lấy kết quả từ stored procedure
        rows = cursor.fetchall()
        # Chuyển đổi kết quả thành dạng list của các dictionary
        tkb_list = []
        for row in rows:
            try:
                start_time = datetime.strptime(row[3].split('.')[0], "%H:%M:%S").time() if row[3] else None
            except ValueError:
                start_time = None
            try:
                end_time = datetime.strptime(row[4].split('.')[0], "%H:%M:%S").time() if row[4] else None
            except ValueError:
                end_time = None
            try:
                ngay_hoc = datetime.strptime(row[5], "%Y-%m-%d").date() if row[5] else None
            except ValueError:
                ngay_hoc = None
            
            tkb_dict = {
                "MaMon": row[0],
                "TenMon": row[1],
                "TenGV": row[2],
                "StartTime": start_time.strftime("%H:%M") if start_time else None,
                "EndTime": end_time.strftime("%H:%M") if end_time else None,
                "NgayHoc": ngay_hoc.strftime("%Y-%m-%d") if ngay_hoc else None,
                "Phong": row[6],
                "LopSv":row[7],
                "MaLop":row[8],
                "TenLop":row[9]
            }
            tkb_list.append(tkb_dict)
        # Đóng kết nối
        connection.close()

        # Trả về danh sách thời khóa biểu dưới dạng JSON
        return tkb_list
    except Exception as e:
        # Nếu có lỗi, trả về lỗi 500 và thông báo lỗi
        raise HTTPException(status_code=500, detail=str(e))

class AttendanceRecord(BaseModel):
    MaSV: str
    name: str
    gioitinh: Optional[str]
    LopSv: str
    NgayHoc:str
    ThoiGianDen: Optional[str]
    TrangThaiDiemDanh: str

@app.get("/get-list/",response_model=List[AttendanceRecord])
async def get_attendance(date : str,MaMon: str,StartTime: str ,MaLop: str):
    try:
            connection = connect_to_database()
            cursor = connection.cursor()
            # Call the stored procedure
            cursor.execute("EXEC AttendanceStudent @date = ?, @MaMon = ?, @Starttime = ?,@MaLop = ?", date, MaMon, StartTime,MaLop)
            
            # Fetch all the results
            rows = cursor.fetchall()
            for row in rows:
                print(row)
            # Map the results to the AttendanceRecord model
            results = [
                AttendanceRecord(
                    MaSV=row[0],
                    name = row[1],
                    gioitinh = row[2],
                    LopSv = row[3],
                    NgayHoc = row[4],
                    ThoiGianDen=row[5].strftime('%Y-%m-%d %H:%M:%S') if row[5] else None,
                    TrangThaiDiemDanh=row[6]
                ) for row in rows
            ]

            return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/liststudent/")
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
    
@app.get("/api/monhoc")
async def get_monhoc():
    try:
        # Kết nối tới cơ sở dữ liệu
        connection = connect_to_database()
        cursor = connection.cursor()
        
        # Thực hiện stored procedure "HocKy"
        cursor.execute("exec HocKy")
        
        # Lấy kết quả từ stored procedure
        rows = cursor.fetchall()
        listHK=[]
        for row in rows:
                listhk = {
                       "HocKy" : row[0],
                       "Nam": row[1]
                }
                listHK.append(listhk)
        # Đóng kết nối
        connection.close()

        # Trả về danh sách kết quả dưới dạng JSON
        return listHK
    except Exception as e:
        # Nếu có lỗi, trả về lỗi 500 và thông báo lỗi
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/getList/")
async def get_ListTkb(MaGV : str,HocKy: str,Nam: str ):
    try:
            connection = connect_to_database()
            cursor = connection.cursor()
            # Call the stored procedure
            cursor.execute("EXEC ClassTeacher @MaGV = ?, @HocKy = ?, @Nam = ?", MaGV,HocKy,Nam)
            ListTkb = []
            rows = cursor.fetchall()
            for row in rows:
                listClass = {
                    "MaSV":row[0],
                    "name":row[1],
                    "HocKy":row[2],
                    "Nam":row[3],
                    "MonHocDetails":row[4]
                }
                ListTkb.append(listClass)
            connection.close()
            return ListTkb
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/getSubject/")
async def get_Subject(MaGV : str,HocKy: str,Nam: str ):
    try:
            connection = connect_to_database()
            cursor = connection.cursor()
            # Call the stored procedure
            cursor.execute("EXEC SubjectTeacher  @MaGV = ?, @HocKy = ?, @Nam = ?", MaGV,HocKy,Nam)
            ListTkb = []
            rows = cursor.fetchall()
            for row in rows:
                listClass = {
                    "TenMon":row[0],
                    "MaMon":row[1],
                    "MaLop":row[2],
                    "TenLop":row[3],
                }
                ListTkb.append(listClass)
            connection.close()
            return ListTkb
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/getListSubject/")
async def get_ListSubject(MaGV : str,HocKy: str,Nam: str,MaMon:str,MaLop:str ):
    try:
            connection = connect_to_database()
            cursor = connection.cursor()
            # Call the stored procedure
            cursor.execute("EXEC [dbo].[ListSubjectTeacher] @MaMon = ?,@MaLop=?,  @MaGV = ?, @Nam = ?,@HocKy = ?",MaMon,MaLop, MaGV,Nam,HocKy)
            ListTkb = []
            rows = cursor.fetchall()
            for row in rows:
                listClass = {
                    "MaMon":row[0],
                    "MaSV":row[1],
                    "name":row[2],
                    "TenMon":row[3],
                    "HocKy":row[4],
                    "Nam":row[5],
                    "SoBuoiHoc":row[6],
                    "BuoiDiemdanh":row[7]
                }
                ListTkb.append(listClass)
            connection.close()
            return ListTkb
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
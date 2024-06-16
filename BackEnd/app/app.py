from fastapi import FastAPI, HTTPException, Request, Form
from typing import Optional, List
from fastapi.responses import JSONResponse
import pyodbc
import jwt
import align.detect_face
import numpy as np
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
from pydantic import BaseModel
import cv2
import os
import subprocess
from FaceRecognitionCamera import FaceRecognitionCamera
import base64
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
            user_info["img"] = row[7]
            user_info["ClassTeacher"] = row[8]
            user_info["StudentClass"] = row[9],
            user_info["Khoa"]=row[10]
        elif user_type == "Giaovien":
            user_info["ID"] = row[1]
            user_info["UserName"] = row[2]
            user_info["Email"] = row[3]
            user_info["Role"] = row[4]
            user_info["Class"] = row[5]
            user_info["Date"] = row[6]
            user_info["img"] = row[7]
            user_info["ClassTeacher"] = row[8]
            user_info["StudentClass"] = row[9],
            user_info["Khoa"]=row[10]
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
@app.get("/api/khoa")
async def get_khoa():
    try:
        # Kết nối tới cơ sở dữ liệu
        connection = connect_to_database()
        cursor = connection.cursor()
        
        # Thực hiện stored procedure "HocKy"
        cursor.execute("exec Khoa")
        
        # Lấy kết quả từ stored procedure
        rows = cursor.fetchall()
        listHK=[]
        for row in rows:
                listhk = {
                       "Khoa" : row[0],
                       "LopSv": row[1]
                }
                listHK.append(listhk)
        # Đóng kết nối
        connection.close()

        # Trả về danh sách kết quả dưới dạng JSON
        return listHK
    except Exception as e:
        # Nếu có lỗi, trả về lỗi 500 và thông báo lỗi
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/showStudent")
async def get_showStudent(LopSv:str):
    try:

        connection = connect_to_database()
        cursor = connection.cursor()
        
        # Thực hiện stored procedure "HocKy"
        cursor.execute("exec showStudent @LopSv = ?",LopSv)
        
        # Lấy kết quả từ stored procedure
        rows = cursor.fetchall()
        listHK=[]
        for row in rows:
                listhk = {
                       "MaSV" : row[0],
                       "name": row[1],
                       "date":row[2],
                       "gioitinh":row[3],
                       "email":row[7],
                       "password":row[10]
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
    
face_recognition = FaceRecognitionCamera()
@app.post("/face-recognition")
async def upload_image(request: Request,  image_data: dict=None):
    if image_data and "image_data" in image_data:
        image_data = base64.b64decode(image_data["image_data"].split(",")[1])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        faces = face_recognition.detect_faces(image)

    # Trả về kết quả
        return faces
    else:
        return JSONResponse(content={"message": "No image data received"}, status_code=400)

@app.post("/student-attendance")
async def updateInfo(request:Request,MaSV:str,MaLop:str,Starttime : str,EndTime:str,MaMon:str,TimeAtt:str):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("EXEC sp_DiemDanhSinhVien @MaSV =?, @MaMon = ?, @MaLop = ?,@ThoiGianDiemDanh =?,@ThoiGianBatDau =?,@ThoiGianKetThuc = ?",MaSV,MaMon,MaLop,TimeAtt,Starttime,EndTime)
    connection.commit()
    return {"Message":"Attendance has been taken"}
    
@app.post("/api/insertlogin")
async def insertLogin(request: Request,username:str,password:str,Chucvu:str):
    print(username,password,Chucvu)
    try:
        connection = connect_to_database()
        cursor = connection.cursor()
        cursor.execute("EXEC IntoLogin @username=?, @password=?, @Chucvu=?, @Action=?;", 
                       (username, password, Chucvu, 'INSERT'))
        connection.commit()
        return {"message": "Thêm tài khoản thành công"}
    except Exception as e:
        # Nếu có lỗi, in ra lỗi để kiểm tra và trả về HTTPException
        print(f"Lỗi khi thực thi câu lệnh SQL: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        connection.close()
   
@app.delete("/deleteLogin")
async def deleteLogin(username:str):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("EXEC IntoLogin @username=?, @password=?,@Chucvu = ?,  @Action = ?; ",username,None,None,'DELETE')
    connection.commit()
    return{"ban da xoa thanh cong"}

@app.put("/updateLogin")
async def updateLogin(username:str,password:str,Chucvu:str):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("EXEC IntoLogin @username=?, @password=?,@Chucvu = ?,  @Action = ?; ",username,password,Chucvu,'UPDATE')
    connection.commit()
    return{"ban da sua thanh cong"}

class ImageCaptureRequest(BaseModel):
    student_id: str
    image_data: str
def save_image(image_data: str, student_id: str):
    student_folder = os.path.join( r'D:\AI_PROJECT\ProJect_DiemDanh\BackEnd\app\Dataset\raw', student_id)  # Đường dẫn thư mục sinh viên
    if not os.path.exists(student_folder):
        os.makedirs(student_folder)

    image_path = os.path.join(student_folder, datetime.now().strftime('%Y%m%d_%H%M%S%f') + '.jpg')
    with open(image_path, "wb") as fh:
        fh.write(base64.b64decode(image_data.split(",")[1]))

    return image_path

@app.post("/api/capture-image/")
async def capture_image(request: ImageCaptureRequest):
    student_id = request.student_id
    image_data_base64 = request.image_data

    # Decode base64 image data
    try:
        image_path = save_image(image_data_base64, student_id)
        message = f"Saved image successfully at {image_path}"
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    return stdout, stderr   
@app.post("/api/align-dataset")
async def align_dataset():
    try:
        align_command = "python BackEnd/app/align_dataset_mtcnn.py BackEnd/app/Dataset/raw BackEnd/app/Dataset/processed --image_size 160 --margin 32 --random_order --gpu_memory_fraction 0.25"
        model_command = "python BackEnd/app/classifier.py TRAIN BackEnd/app/Dataset/processed BackEnd/app/Models/20180402-114759.pb BackEnd/app/Models/facemodel1.pkl --batch_size 1000"

        align_output, align_error = run_command(align_command)
        model_output, model_error = run_command(model_command)
        if align_error:
            raise Exception(f"Error in align dataset: {align_error.decode('utf-8')}")

        return {"message": "Dataset aligned successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to align dataset: {str(e)}")

@app.put("/api/updateStu")
async def updateStu(MaSV:str,name:str,date:str,gioitinh:str):
    connection = connect_to_database()
    cursor = connection.cursor()
    try:
        cursor.execute("""
            EXEC CRUDStuTea 
                @name = ?,
                @role = ?,
                @date = ?,
                @Operation = 'update',
                @MaSV = ?,
                @ObjectType = 'Sinh vien',
                @email = '',
                @MaGV = '',
                @Khoa = '',
                @LopSV = ''
            """, (name, gioitinh, date, MaSV))
        
        connection.commit()
        
        return {"message": "Bạn đã sửa thông tin sinh viên thành công."}
    
    except Exception as e:
        return {"error": f"Lỗi khi cập nhật sinh viên: {str(e)}"}
    
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
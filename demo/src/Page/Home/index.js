import React, { useEffect, useState } from 'react';
import getUserInfo from '../../common/Api/ApiInFo';
import getUserSchedule from '../../common/Api/ApiTkb'; // Import hàm API
import './style.css'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Modal,Form, Input, DatePicker, Spin} from 'antd';
import getUpdateStu from '../../common/Api/ApiUpdateStuTea'
import { FaSave } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import getUpdateLogin  from '../../common/Api/ApiUpdateLogin'
import moment from 'moment';
const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const Role = localStorage.getItem('chuc vu');
  const username = localStorage.getItem('username');
  const [form] = Form.useForm();

  const [classesThisWeek, setClassesThisWeek] = useState(0);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1,setModalVisible1]=useState(false)
  const [newpassword,setNewpass]=useState('')
  useEffect(() => {
    // Lấy username từ localStorage
    if ( Role !== 'admin') {
      // Gọi API để lấy thông tin người dùng dựa trên username
      getUserInfo(username)
        .then(data => {
          setUserInfo(data);
        })
        .catch(error => {
          console.log(error.message);
        });
        getUserSchedule(username)
        .then(data => {
          calculateClassesThisWeek(data);
          calculateUpcomingClasses(data);
        })
        .catch(error => {
          console.log(error.message);
        });
    } else if (Role === 'admin') {
      // Nếu vai trò là admin, hiển thị thông tin admin
      setUserInfo({
        UserName: username,
        UserType: 'admin' // hoặc bạn có thể đặt các giá trị khác tùy thuộc vào cấu trúc của dữ liệu
      });
    } else {
      console.log('No username found in localStorage');
    }
  }, [Role, username]);
  const calculateClassesThisWeek = (schedule) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));

    const classes = schedule.filter(classItem => {
      const classDate = new Date(classItem.NgayHoc);
      return classDate >= startOfWeek && classDate <= endOfWeek;
    });

    setClassesThisWeek(classes.length);
  };
  if (!userInfo) {
    return <div><Spin></Spin></div>;
  }
  const calculateUpcomingClasses = (schedule) => {
    const now = new Date();

    const upcoming = schedule.filter(classItem => {
      const classDate = new Date(classItem.NgayHoc);
      return classDate > now;
    }).slice(0, 5); // Giới hạn hiển thị 5 buổi học sắp tới

    setUpcomingClasses(upcoming);
  };

  const handUpdate =()=>{
    setModalVisible(true)
  }
  const handleOk = () => {
    form.validateFields().then(values => {
      const updatedData = {
        MaSV: values.MaSV,
        name: values.name,
        gioitinh: values.gioitinh,
        date: values.date ? values.date.format('YYYY-MM-DD') : null
      };
      console.log(updatedData);
      
      getUpdateStu(updatedData.MaSV,updatedData.gioitinh,updatedData.date,updatedData.name)
        .then(response => {
          console.log('Cập nhật thành công:', response);
          setModalVisible(false);
          // Cập nhật lại thông tin người dùng sau khi chỉnh sửa
          getUserInfo(username)
            .then(data => setUserInfo(data))
            .catch(error => console.log(error.message));
        })
        .catch(error => console.error('Lỗi khi cập nhật:', error));
    }).catch(errorInfo => {
      console.error('Lỗi khi validate:', errorInfo);
    });
  };
  const handStuLogin =()=>{
    setModalVisible1(true)
  }

  const handStuLogin1 = async()=>{
    await getUpdateLogin(username,newpassword,Role).then(data=>{
      alert("Đổi mật khẩu thành công ")
      setModalVisible1(false)
    })
  }
  return (
    <div>
      {userInfo.UserType === 'Giaovien' && (
              <div className='HomeStudent'>
              <div className='HomePage'>
            <h2>Thông tin giảng viên</h2>
            <div className='body-home'>
             <div  className="user-info">
             <p><label>Họ và tên: </label>{userInfo.UserName}</p>
             <p><label>Mã giảng viên: </label>{userInfo.ID}</p>
             <p><label>Email: </label>{userInfo.Email}</p>
             <Button onClick={handStuLogin} color='error' variant="contained" style={{marginLeft:10}}>Đổi mật khẩu </Button>
             </div>
            <img src={userInfo.img} alt=''></img>
            </div>
           </div>
           <div className='home-user'>
             <div className='schedule'>
                <h3>Lịch học tuần này</h3>
             {classesThisWeek > 0 ? (
               <p>Bạn có {classesThisWeek} buổi học trong tuần này.</p>  
               ) : (
                <p>Bạn không có lịch học trong tuần này.</p>
               )}
             <Link to='/tkb'>Xem chi tiết </Link>
           </div>
           <div className='schedule test '>
                <h3>Lịch học của bạn hiện tại</h3>
                {upcomingClasses.length > 0 ? (
              <ul>
                {upcomingClasses.map((classItem, index) => (
                  <li key={index}>
                    <p>{classItem.TenMon} - {format(new Date(classItem.NgayHoc), 'dd/MM/yyyy')} - {classItem.StartTime} - {classItem.Phong}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có lịch học sắp tới.</p>
            )}
           </div>
             </div>
             {
          modalVisible1 && (
            <Modal  open={modalVisible1} title="Đổi mật khẩu "onOk={handStuLogin1}
             footer={[
              <Button key="back" onClick={() => setModalVisible1(false)} color='error'variant="contained" style={{marginRight:10}}>
               Hủy
              </Button>,
              <Button key="submit" variant="contained" onClick={handStuLogin1}>
                 Đổi mật khẩu
              </Button>,
            ]} >
              <Form form={form} layout="vertical" initialValues={{
                MaSV: userInfo.ID,
                name: userInfo.UserName,
              }}>
                  <Form.Item name="MaSV" label="Mã giáo viên">
         <Input disabled />
            </Form.Item>
            <Form.Item name="name" label="Tên giáo viên">
            <Input disabled />
          </Form.Item>

          <Form.Item  label="Mật khẩu mới"  rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới ',
              },
            ]}>
            <Input placeholder='nhập mật khẩu mới' onChange={(e)=>setNewpass(e.target.value)} />
          </Form.Item>
              </Form>

            </Modal>
          )
        }
           </div>
      )}
      {userInfo.UserType === 'SinhVien' && (
        <div className='HomeStudent'>
           <div className='HomePage'>
         <h2>Thông tin sinh viên</h2>
         <div className='body-home'>
          <div  className="user-info">
          <p><label>Họ và tên: </label>{userInfo.UserName}</p>
          <p><label>Mã số sinh viên: </label>{userInfo.ID}</p>
          <p><label>Khoa: </label>{userInfo.Khoa}</p>
          <p><label>Email: </label>{userInfo.Email}</p>
          <p><label>Giới tính: </label>{userInfo.Role}</p>
          <p><label>Lớp sinh viên: </label>{userInfo.Class}</p>
          <p><label>Ngày sinh: </label>{format(new Date(userInfo.Date), 'dd/MM/yyyy')}</p>
          <p><label>Cố vấn học tập: </label>{userInfo.ClassTeacher}</p>
          <Button onClick={handUpdate} color='success' variant="contained"> Sửa thông tin cá nhân </Button>
          <Button onClick={handStuLogin} color='error' variant="contained" style={{marginLeft:10}}>Đổi mật khẩu </Button>
          </div>
          <img src={userInfo.img} alt=''></img>
          
         </div>
        </div>
        <div className='home-user'>
          <div className='schedule'>
             <h3>Lịch học tuần này</h3>
          {classesThisWeek > 0 ? (
            <p>Bạn có {classesThisWeek} buổi học trong tuần này.</p>  
            ) : (
             <p>Bạn không có lịch học trong tuần này.</p>
            )}
          <Link to='/tkb'>Xem chi tiết </Link>
        </div>
          </div>
          {modalVisible && (
        <Modal
        open={modalVisible}
          title="Cập nhật thông tin sinh viên "
          onCancel={() => setModalVisible(false)}
          onOk={handleOk}
          footer={[
          <Button key="back" onClick={() => setModalVisible(false)} color='error'variant="contained" style={{marginRight:10}}>
           <MdCancelPresentation /> Hủy
          </Button>,
          <Button key="submit" variant="contained" onClick={handleOk}>
            <FaSave /> Lưu
          </Button>,
        ]}
        className='title-info'
        >
         <Form  form={form}  layout="vertical" name="student_info_form" initialValues={{
                MaSV: userInfo.ID,
                name: userInfo.UserName,
                gioitinh: userInfo.Role,
                date: userInfo.Date ? moment(userInfo.Date) : null 
              }}>
          <Form.Item name="MaSV" label="Mã sinh viên">
         <Input disabled />
            </Form.Item>
            <Form.Item name="name" label="Tên sinh viên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên sinh viên',
              },
            ]}
          >
            <Input placeholder="Nhập tên sinh viên" />
          </Form.Item>
        <Form.Item name="gioitinh" label="Giới tính ">
        <Input placeholder="Giới tính"  />
          </Form.Item>
          <Form.Item name="date" label="Ngày sinh">
          <DatePicker  format="DD/MM/YYYY" placeholder="Chọn ngày sinh"  />
          </Form.Item>
        </Form>
        </Modal>)}
        {
          modalVisible1 && (
            <Modal  open={modalVisible1} title="Đổi mật khẩu "onOk={handStuLogin1}
             footer={[
              <Button key="back" onClick={() => setModalVisible1(false)} color='error'variant="contained" style={{marginRight:10}}>
               Hủy
              </Button>,
              <Button key="submit" variant="contained" onClick={handStuLogin1}>
                 Đổi mật khẩu
              </Button>,
            ]} >
              <Form form={form} layout="vertical" initialValues={{
                MaSV: userInfo.ID,
                name: userInfo.UserName
              }}>
                  <Form.Item name="MaSV" label="Mã sinh viên">
         <Input disabled />
            </Form.Item>
            <Form.Item name="name" label="Tên sinh viên">
            <Input disabled />
          </Form.Item>

          <Form.Item  label="Mật khẩu mới"  rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới ',
              },
            ]}>
            <Input placeholder='nhập mật khẩu mới' onChange={(e)=>setNewpass(e.target.value)} />
          </Form.Item>
              </Form>

            </Modal>
          )
        }
        </div>
      )}
    
    </div>
  );
};

export default Home;

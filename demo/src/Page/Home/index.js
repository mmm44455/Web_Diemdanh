import React, { useEffect, useState } from 'react';
import getUserInfo from '../../common/Api/ApiInFo';
import getUserSchedule from '../../common/Api/ApiTkb'; // Import hàm API
import './style.css'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const Role = localStorage.getItem('chuc vu');
  const username = localStorage.getItem('username');
  
  const [classesThisWeek, setClassesThisWeek] = useState(0);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

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
    return <div>Loading...</div>;
  }
  const calculateUpcomingClasses = (schedule) => {
    const now = new Date();

    const upcoming = schedule.filter(classItem => {
      const classDate = new Date(classItem.NgayHoc);
      return classDate > now;
    }).slice(0, 5); // Giới hạn hiển thị 5 buổi học sắp tới

    setUpcomingClasses(upcoming);
  };

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
          <p><label>Email: </label>{userInfo.Email}</p>
          <p><label>Giới tính: </label>{userInfo.Role}</p>
          <p><label>Lớp sinh viên: </label>{userInfo.Class}</p>
          <p><label>Ngày sinh: </label>{format(new Date(userInfo.Date), 'dd/MM/yyyy')}</p>
          <p><label>Cố vấn học tập: </label>{userInfo.ClassTeacher}</p>
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
         
        </div>
      )}
      {Role === 'admin' && (
        <div className='HomePage'>
          <h1>Thông tin admin</h1>           
        </div>
      )}
    </div>
  );
};

export default Home;

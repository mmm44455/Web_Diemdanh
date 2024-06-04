import React, { useEffect, useState } from 'react';
import getUserInfo from '../../common/Api/ApiInFo'; // Import hàm API
import './style.css'

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const Role = localStorage.getItem('chuc vu');
  const username = localStorage.getItem('username');
  
  useEffect(() => {
    // Lấy username từ localStorage
    if ( Role !== 'admin') {
      // Gọi API để lấy thông tin người dùng dựa trên username
      getUserInfo(username)
        .then(data => {
          setUserInfo(data);
        })
        .catch(error => {
          setError(error.message);
        });
    } else if (Role === 'admin') {
      // Nếu vai trò là admin, hiển thị thông tin admin
      setUserInfo({
        UserName: username,
        UserType: 'admin' // hoặc bạn có thể đặt các giá trị khác tùy thuộc vào cấu trúc của dữ liệu
      });
    } else {
      setError('No username found in localStorage');
    }
  }, [Role, username]);
 
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userInfo.UserType === 'Giaovien' && (
        <div className='HomePage'>
          <h1>Thông tin giảng viên</h1>
          <h2>Welcome, {userInfo.UserName}</h2>
          {userInfo.Email && <p>Email: {userInfo.Email}</p>}
        </div>
      )}
      {userInfo.UserType === 'SinhVien' && (
        <div className='HomePage'>
          <h1>Thông tin sinh viên</h1>
          <h2>Welcome, {userInfo.UserName}</h2>
          <p>Giới tính: {userInfo.Role}</p>
          <p>Lớp sinh viên : {userInfo.Class}</p>
          <p>Ngày sinh :{userInfo.Date}</p>
          <p>Cố vấn học tập : {userInfo.ClassTeacher}</p>
        </div>
      )}
      {Role === 'admin' && (
        <div className='HomePage'>
          <h1>Thông tin admin</h1>           
        </div>
      )}
    </>
  );
};

export default Home;

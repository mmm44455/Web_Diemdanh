// src/Page/Home.js
import React, { useEffect, useState } from 'react';
import getUserInfo from '../../common/Api/ApiInFo'; // Import hàm API
import './style.css'
const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const getUserRole = () => {
    // Giả sử bạn đã lưu vai trò của người dùng vào localStorage
    const userRole = localStorage.getItem('chuc vu');
    return userRole;
  };
  useEffect(() => {
    // Lấy username từ localStorage
    const username = localStorage.getItem('username');
    if (username) {
      // Gọi API để lấy thông tin người dùng dựa trên username
      getUserInfo(username)
        .then(data => {
          setUserInfo(data);
        })
        .catch(error => {
          setError(error.message);
        });
    } else {
      setError('No username found in localStorage');
    }
  }, []);
  const userRole = getUserRole();
  const renderUserInfo = () => {
    
  
    switch (userRole) {
      case 'Sinh vien':
        return (
          <div className='HomePage'>
            <h1>Thông tin sinh viên </h1>
            <h2>Welcome, {userInfo.UserName}</h2>
            <p>Giới tính: {userInfo.Role}</p>
            <p>Lớp sinh viên : {userInfo.Class}</p>
            <p>Ngày sinh :{userInfo.Date}</p>
            <p>Cố vấn học tập  : {userInfo.ClassTeacher}</p>
          </div>
        );
      case 'Giao vien':
        return (
          <div className='HomePage'>
             <h1>Thông tin giảng viên</h1>
            <h2>Welcome, {userInfo.UserName}</h2>
            {userInfo.Email && <p>Email: {userInfo.Email}</p>}
          </div>
        );
      case 'admin':
        return (
          <div className='HomePage'>
             <h1>Thông tin admin</h1>           
          </div>
        );
      default:
        return <p>Unknown role</p>;
    }
  };
  

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : userInfo ? (
        renderUserInfo()
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Home;
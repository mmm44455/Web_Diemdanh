import Avater from '../../asset/img/avaratrFo.jpg'
import getUserInfo from '../../common/Api/ApiInFo';
import { Card, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import './sytle.css'

const FormInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const getUserRole = () => {
    const userRole = localStorage.getItem('chuc vu');
    return userRole;
  };
  useEffect(() => {
    
    
    const username = localStorage.getItem('username');

    if (username) {
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
  const name = localStorage.getItem('username');

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-info">
      <Card.Meta
        avatar={<Avatar src={Avater} size={64} />}
      />
      {userInfo.UserType === 'Giaovien' && (
        <div>
          <h2 style={{ margin: '10px 0 0 0' }}> {userInfo.UserName}</h2>
          <p style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{userInfo.Email}</p>
        </div>
      )}
      {userInfo.UserType === 'SinhVien' && (
        <div>
          <h3> {userInfo.UserName}</h3>
        </div>
      )}
      {userRole === 'admin' && (
        <div>
          <h3> {name}</h3>
        </div>
      )}
    </div>
  );
};

export default FormInfo;

import getUserInfo from '../../common/Api/ApiInFo';
import { useEffect, useState } from 'react';

const TitleUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('chuc vu');

  useEffect(() => {
    if (role !== 'admin') {
      // Chỉ gọi API nếu không phải là admin
      getUserInfo(username)
        .then(data => {
          setUserInfo(data);
        })
        .catch(error => {
          setError(error.message);
        });
    } else {
      setUserInfo({ UserType: role, UserName: username });
    }
  }, [username, role]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userInfo.UserType === 'Giaovien' && (
        <div>
          <p style={{ margin: '0 10px 0 0', fontFamily: 'cursive' }}>Giảng viên , {userInfo.UserName}</p>
        </div>
      )}
      {userInfo.UserType === 'SinhVien' && (
        <div>
          <p style={{ margin: '0 10px 0 0', fontFamily: 'cursive' }}>Sinh viên , {userInfo.UserName}</p>
        </div>
      )}
      {role === 'admin' && (
        <div>
          <p style={{ margin: '0 10px 0 0', fontFamily: 'cursive' }}>Quản trị viên , {role}</p>
        </div>
      )}
    </>
  );
};

export default TitleUser;

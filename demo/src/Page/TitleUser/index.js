import getUserInfo from '../../common/Api/ApiInFo';
import { useEffect, useState } from 'react';
const TitleUser = ()=>{
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    
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
      
  if (!userInfo) {
    return <div>Loading...</div>;
  }
    return(
        <>
        {userInfo.UserType === 'Giaovien' && (
            <div>
              <p style={{ margin: '0 10px 0 0',fontFamily:'cursive'}}>Giảng viên , {userInfo.UserName}</p>
            </div>
          )}
          {userInfo.UserType=== 'SinhVien' && (
            <div>
              <p style={{ margin: '0 10px 0 0',fontFamily:'cursive'}}> Sinh viên , {userInfo.UserName}</p>
            </div>
          )}
        </>
    )
}
export default TitleUser
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Điều chỉnh URL của API tại đây

const getApiList = async (MaMon,StartTime,date,MaLop) => {
  try {
    // Gửi yêu cầu GET đến API để lấy thông tin người dùng
    const response = await axios.get(`${API_URL}/get-list/?MaMon=${MaMon}&StartTime=${StartTime}&date=${date}&MaLop=${MaLop}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info. Please try again.');
  }
};

export default getApiList

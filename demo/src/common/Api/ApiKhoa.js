import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Điều chỉnh URL của API tại đây

const  getKhoaStu  = async () => {
  try {
    // Gửi yêu cầu GET đến API để lấy thông tin người dùng
    const response = await axios.get(`${API_URL}/api/khoa`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info. Please try again.');
  }
};

export default getKhoaStu

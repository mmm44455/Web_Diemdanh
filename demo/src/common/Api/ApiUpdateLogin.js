import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Điều chỉnh URL của API tại đây

const  getUpdateLogin  = async (username,password,Chucvu) => {
  try {
    const response = await axios.put(`${API_URL}/updateLogin/?username=${username}&password=${password}&Chucvu=${Chucvu}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info. Please try again.');
  }
};

export default getUpdateLogin 

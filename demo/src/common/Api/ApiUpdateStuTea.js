import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Điều chỉnh URL của API tại đây

const  getUpdateStu  = async (MaSV,role,date,name) => {
  try {
    const response = await axios.put(`${API_URL}/api/updateStu/?MaSV=${MaSV}&gioitinh=${role}&date=${date}&name=${name}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info. Please try again.');
  }
};

export default getUpdateStu

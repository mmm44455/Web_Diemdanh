// Import thư viện axios
import axios from 'axios';

// Hàm gửi yêu cầu đăng nhập
const ApiLogin = async (username, password,Chucvu) => {
    try {
        // Gửi yêu cầu POST đến API Login với dữ liệu đăng nhập
        const response = await axios.post('http://127.0.0.1:8000/login/', {
            username: username,
            password: password,
            role:Chucvu
        });
        localStorage.setItem('token', response.data.token);
        // Trả về dữ liệu phản hồi từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error while logging in:', error);
        throw error;
    }
};

// Xuất hàm để có thể sử dụng ở nơi khác trong ứng dụng của bạn
export default ApiLogin
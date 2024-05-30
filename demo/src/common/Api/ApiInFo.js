import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Điều chỉnh URL của API tại đây

const getUserInfo = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/user-info/?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info. Please try again.');
  }
};

export default getUserInfo;

import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Điều chỉnh URL của API tại đây

const getShow = async (LopSv) => {
  try {
    const response = await axios.get(`${API_URL}/showStudent/?LopSv=${LopSv}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info. Please try again.');
  }
};

export default getShow;

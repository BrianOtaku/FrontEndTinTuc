import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7161/api/News',  // Thay đổi URL này với URL API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

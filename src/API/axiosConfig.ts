import axios from 'axios';

const API_KEY = 'd8a20cdd59804a4dbe591e1ec1c2ee62';

const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});

export default axiosInstance;

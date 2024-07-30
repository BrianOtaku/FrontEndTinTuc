import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://localhost:7161/api/News',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosInstance;

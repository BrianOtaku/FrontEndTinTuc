import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AxiosInstance = axios.create({
  baseURL: 'https://localhost:7161/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

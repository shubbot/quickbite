import axios from 'axios';

const isProd = import.meta.env.MODE === 'production';

const baseURL = isProd
  ? 'https://quickbite-api30-hrhsh6a9bffdfdh7.centralindia-01.azurewebsites.net/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('qb_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
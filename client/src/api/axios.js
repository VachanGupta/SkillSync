import axios from 'axios';
import getApiBaseUrl from '../utils/getApiBaseUrl';
const base = getApiBaseUrl() + '/api';
console.log('API Base URL:', base);
const api = axios.create({ baseURL: base });

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        status: error.response.status,
        message: error.response.data?.msg || error.message
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        message: 'No response from server. Is the backend running?'
      });
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

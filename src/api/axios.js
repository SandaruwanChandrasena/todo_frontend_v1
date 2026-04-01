import axios from 'axios';

// Create Customer Axios Object
// You can now write:
// API.get('/tasks');

const API = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://todo-backend-twd4.onrender.com/api',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
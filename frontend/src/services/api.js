import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

export const userService = {
  getAll: () => api.get('/api/users'),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (userData) => api.post('/api/users', userData),
  update: (id, userData) => api.put(`/api/users/${id}`, userData),
  delete: (id) => api.delete(`/api/users/${id}`),
};

export const postService = {
  getAll: () => api.get('/api/posts'),
  getById: (id) => api.get(`/api/posts/${id}`),
  create: (postData) => api.post('/api/posts', postData),
  update: (id, postData) => api.put(`/api/posts/${id}`, postData),
  delete: (id) => api.delete(`/api/posts/${id}`),
};

export default api;
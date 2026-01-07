import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://assignment-fullstackintern.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  updateProfile: async (name?: string, email?: string) => {
    const response = await api.put('/profile', { name, email });
    return response.data;
  },
};

export const tasksAPI = {
  getTasks: async (filters?: { status?: string; priority?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.search) params.append('search', filters.search);
    
    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },
  getTask: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  createTask: async (task: { title: string; description?: string; status?: string; priority?: string }) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  updateTask: async (id: string, task: { title?: string; description?: string; status?: string; priority?: string }) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },
  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;


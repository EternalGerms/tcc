import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          toast.error('Sessão expirada. Faça login novamente.');
          break;
        case 403:
          toast.error('Você não tem permissão para realizar esta ação.');
          break;
        case 404:
          toast.error('Recurso não encontrado.');
          break;
        case 500:
          toast.error('Erro no servidor. Tente novamente mais tarde.');
          break;
        default:
          toast.error(error.response.data.message || 'Erro ao processar requisição.');
      }
    } else if (error.request) {
      toast.error('Erro de conexão. Verifique sua internet.');
    } else {
      toast.error('Erro ao processar requisição.');
    }
    return Promise.reject(error);
  }
);

export default api; 
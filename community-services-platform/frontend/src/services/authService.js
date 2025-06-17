import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (userId, profileData) => {
    const response = await api.put(`/users/${userId}`, profileData);
    return response.data;
  },
};

export default authService; 
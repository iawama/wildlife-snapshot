import api from './axios';

export const register = async (credentials) => {
  return await api.post('/users', credentials);
};


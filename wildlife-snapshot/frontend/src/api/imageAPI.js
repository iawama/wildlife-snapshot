import api from './axios';

export const getImages = async (page = 1) => {
  return await api.get('/images', { params: { page } });
};
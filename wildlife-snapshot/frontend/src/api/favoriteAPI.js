import api from './axios';

export const addFavorite = async (imageId) => {
  return await api.post('/favorites', { image_id: imageId });
};

export const removeFavorite = async (imageId) => {
  return await api.delete(`/favorites/${imageId}`);
};
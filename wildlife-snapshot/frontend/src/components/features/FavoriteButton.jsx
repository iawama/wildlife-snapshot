import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addFavorite, removeFavorite } from '../../api/favoriteAPI';

const FavoriteButton = ({ imageId }) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    if (!user) {
      setError('Please log in to favorite images');
      return;
    }
    try {
      if (isFavorited) {
        await removeFavorite(imageId);
        setIsFavorited(false);
      } else {
        await addFavorite(imageId);
        setIsFavorited(true);
      }
      setError(null);
    } catch (err) {
      setError('Failed to toggle favorite');
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleToggle}
        className={`px-3 py-1 rounded ${isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
      >
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FavoriteButton;
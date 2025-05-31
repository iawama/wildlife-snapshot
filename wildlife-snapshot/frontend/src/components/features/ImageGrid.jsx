import React, { useState, useEffect } from 'react';
import { getImages } from '../../api/imageAPI';
import FavoriteButton from './FavoriteButton';
import Card from '../ui/Card';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getImages(page);
        setImages(response.data.images);
        setTotalPages(response.data.total_pages || 1);
      } catch (err) {
        setError('Failed to load images.');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page]);

  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="relative">
            <img src={image.url} alt={image.title} className="w-full h-48 object-cover" />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <p className="text-sm">Date: {image.date}</p>
              <p className="text-sm">Category: {image.category || 'None'}</p>
              <FavoriteButton imageId={image.id} />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGrid;
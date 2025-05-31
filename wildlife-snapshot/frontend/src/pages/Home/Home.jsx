import React from 'react';
import ImageGrid from '../../components/features/ImageGrid';
import CategoryFilter from '../../components/features/CategoryFilter';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold p-4">Cosmic Image Fetcher</h1>
      <CategoryFilter onCategorySelect={() => {}} />
      <ImageGrid />
    </div>
  );
};

export default Home;
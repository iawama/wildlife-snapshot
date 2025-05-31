import React from 'react';

const Card = ({ children, className }) => {
  return <div className={`border rounded-lg overflow-hidden ${className}`}>{children}</div>;
};

export default Card;
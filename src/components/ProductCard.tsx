// components/ProductCard.tsx
import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, description }) => {
  return (
    <div className="rounded-lg  overflow-hidden bg-white text-left">
      <img src={image} alt={title} className="w-64 h-72 object-cover " />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-xl font-bold text-red-600 mt-2">{price}</p>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;

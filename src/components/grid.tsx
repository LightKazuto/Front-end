// pages/index.tsx
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: '/path/to/image1.jpg',
      title: 'Product 1',
      price: 'Rp. 100.000',
      description: '4.5'
    },
    {
      id: 2,
      image: '/path/to/image2.jpg',
      title: 'Product 2',
      price: 'Rp.99.000',
      description: '4.2'
    },
    {
      id: 3,
      image: '/path/to/image3.jpg',
      title: 'Product 3',
      price: '$39.99',
      description: '4.8'
    }
  ]);

  return (
    <div className="flex flex-col items-center w-full py-24 bg-white">
      <div className="flex flex-wrap justify-center gap-8 w-4/6  p-10">
        {products.map(product => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

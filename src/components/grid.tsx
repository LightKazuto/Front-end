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
      image: 'https://th.bing.com/th/id/OIP._ysCJqtfVyIKHdE-yECJzgHaE8?rs=1&pid=ImgDetMain',
      title: 'Product 1',
      price: 'Rp. 100.000',
      description: '4.5'
    },
    {
      id: 2,
      image: 'https://th.bing.com/th/id/R.936f2fc892e5132164c645ac7b6ea719?rik=LrXhfKREcwcTtA&riu=http%3a%2f%2flugualami.net%2fwp-content%2fuploads%2f2017%2f01%2fLugu-Alami-Khasiat-Kangkung-1.jpg&ehk=f6Teh5ZvZKXtemSeFWysf0eS41Rru0jEym0CeE%2bTmJE%3d&risl=&pid=ImgRaw&r=0',
      title: 'Product 2',
      price: 'Rp.99.000',
      description: '4.2'
    },
    {
      id: 3,
      image: 'https://th.bing.com/th/id/OIP.fkydlyArZwW4BfFYe3rVFgHaFg?rs=1&pid=ImgDetMain',
      title: 'Product 3',
      price: 'Rp.10.000',
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

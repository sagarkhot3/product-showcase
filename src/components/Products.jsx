import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from './ProductCard';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
      const fetchProducts = async () => {
        try {
          const data = await api('/products','GET')
          setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    },[])
    
   return <>
            <h1 className="p-4 text-2xl font-bold mb-6 text-center text-white bg-purple-600">Product Showcase</h1>
            <div className="w-full">
              <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
}

export default ProductGrid;
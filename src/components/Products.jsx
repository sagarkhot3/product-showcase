import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from './ProductCard';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('price');
    const [categoryFilter, setCategoryFilter] = useState('All');


    const handleSort = (event) => {
      const value = event.target.value;
      console.log('changing the sorting', event)
      setSortBy(value);
      
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (value === 'price') {
          return a.price - b.price;
        } else if (value === 'rating') {
          return b.rating.rate - a.rating.rate;
        }
        return 0;
      });
      
      setFilteredProducts(sortedProducts);
    };
    
    const handleCategoryFilter = (event) => {
      const value = event.target.value
      setCategoryFilter(value);
      console.log('changing the filter', event)
  
      if (value === 'All') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) => product.category === value);
        console.log(filtered)
        setFilteredProducts(filtered);
      }
    };

    useEffect(()=> {
      const fetchProducts = async () => {
        try {
          const data = await api('/products','GET')
          setProducts(data);
          setFilteredProducts(data);;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    },[])
    
   return <>
            <h1 className="p-4 text-2xl font-bold mb-6 text-center text-white bg-purple-600">Product Showcase</h1>
            <div className="flex justify-around mb-6">
              <div>
                <label htmlFor="sortBy" className="mr-2">Sort By:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={handleSort}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
                <div>
                  <label htmlFor="categoryFilter" className="mr-2">Filter By Category:</label>
                  <select
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={handleCategoryFilter}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="All">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                </div>
              </div>
            <div className="w-full">
              <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
}

export default ProductGrid;
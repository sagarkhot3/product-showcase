import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = (props) => {

  const {image, title, price, category, description, rating} = props.product;
  return (
    <div className='w-full border border-gray-200 rounded-lg p-4 w-64 text-center shadow-md'>
      <img
        src={image}
        alt={title}
        className='w-full h-48 object-contain mb-4'
      />
      <h2 className='text-lg font-semibold mb-2'>{title}</h2>
      <p className='font-bold text-lg'>${price}</p>
      <p className='text-sm capitalize mb-3'>{category}</p>
      <p className='text-xs mb-3'>
        {description.slice(0, 60)}...
      </p>
      <div className='flex justify-center items-center gap-1'>
        <span className='text-yellow-500'>★</span>
        <p className='text-gray-600'>
          {rating.rate}({rating.count} reviews)
        </p>
      </div>
      <button className='mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'>
        View Details
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;

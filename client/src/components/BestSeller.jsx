import React from 'react'
import ProductCard from './ProductCard'
import {useAppContext} from '../context/AppContext';

function BestSeller() {
    const {product} = useAppContext();
  return (
    <div className='mt-16'>
      <p className='text-xl md:text-3xl font-medium'>Best Seller</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 mt-6 gap-8 md:gap-10'>
        {product.filter((product)=> product.inStock).slice(0,5).map((product, index) => (
          
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller;

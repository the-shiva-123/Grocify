import React from 'react'

import { UseAppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

const BestSeller = () => {
  const { Products } = UseAppContext()

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 mt-6'>
        {Products.filter((product) => product.inStock).slice(0,5).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
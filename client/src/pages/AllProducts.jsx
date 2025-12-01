import React, { useEffect } from 'react'
import { UseAppContext } from '../context/AppContext'
import ProductCard from '../Components/ProductCard';

const AllProducts = () => {
    const { Products, filteredProducts, setFilterProducts, searchQuery } = UseAppContext();
    
    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilterProducts(Products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilterProducts(Products);
        }
    }, [Products, searchQuery, setFilterProducts])
  return (
    <div className='mt-24 flex flex-col'>
        <div className='flex flex-col item-end w-max'>
            <p className='text-2xl md:text-3xl font-medium'>All PRODUCTS</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 lg:grid-cols-4 mt-6'>
            {filteredProducts.filter((product) => product.inStock).map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default AllProducts
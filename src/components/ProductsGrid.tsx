import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils';

const ProductsGrid = () => {
    const {products, meta} = useLoaderData(); //we can get here data from paent component Landing. this component is nested inside Landing (not directly but nested) so using getLoaderData we can accesss info which are downloaded by Landing componetn
    console.log("Products: ",products);
    console.log("grid meta ", meta);
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        
      {
      products.map((item)=>{
        const {title, price, image} = item.attributes;
        const dollarsAmount = formatPrice(price);
        return (
        <Link key={item.id} to={`/products/${item.id}`} className='card w-full shadow-xl hover:shadow-2xl transition duration-300'>
            <figure className='px-4 pt-4'>
                <img src={image} alt={title} className='rounded-xl h-64 md:h-48 w-full object-cover'/>

            </figure>
            <div className='card-body items-center text-center'>
                <h2 className='card-title capitalize -tracking-wider'>{title}</h2>
                <span className='text-secondary'>{dollarsAmount}</span>
            </div>
        </Link>)
      })}
    
    </div>
  )
}

export default ProductsGrid

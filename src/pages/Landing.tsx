import React from 'react'
import { FeaturedProducts, Hero } from '../components'
import { Link } from 'react-router-dom';
import { customFetch } from '../utils';

const url= "/products?featured=true"

export const loader = async ()=>{
  const response = await customFetch.get(url);
  const products = response.data.data;
  return {products};
};

const Landing = () => {
  return (
    <div className='grid grid-cols-1'>
      <Hero />
      <FeaturedProducts />
    </div>
  )
}

export default Landing

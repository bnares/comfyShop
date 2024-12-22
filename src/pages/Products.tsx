import React from 'react'
import SingleProduct from './SingleProduct'
import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';


export const loader = async ({request})=>{
  console.log("Products loader")
  const response = await customFetch.get("/products");
  console.log(response);
  return {products:response.data.data, meta: response.data.meta};
}

const Products = () => {
  return (
    <div>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
      
    </div>
  )
}

export default Products

import React from 'react'
import SingleProduct from './SingleProduct'
import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';

const url = "/products"

export const loader = async ({request})=>{
  console.log("Products loader: ",request);
  const params =Object.fromEntries( [...new URL(request.url).searchParams.entries()]);
  console.log("params: ", params);
  
  const response = await customFetch.get(url, {
    params: params,
  });
  console.log(response);
  return {products:response.data.data, meta: response.data.meta, params};
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

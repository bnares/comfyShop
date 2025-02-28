import React, { useState } from 'react'
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { useLoaderData } from 'react-router-dom';
import { FaHtml5 } from 'react-icons/fa6';

const ProductsContainer = () => {
  const {meta} = useLoaderData();
  console.log("meta: ", meta);
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern)=>{
    return `text-xl btn btn-circle btn-sm ${pattern===layout ? "btn-primary text-primary-content" : "btn-ghost text-based-content"} `;
  };



  return (
    <div >
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300
        pb-5 "
        >
          <h4 className="font-medium text-md">
           {totalProducts} {totalProducts>1 ? "Products" : "Product"}
          </h4>
          <div className="flex gap-x-2">
            <button type='button' onClick={()=>setLayout("grid")} className={setActiveStyles("grid")}>
              <BsFillGridFill />
            </button>
            <button type='button' onClick={()=>setLayout("list")} className={setActiveStyles("list")}>
              <BsList />
            </button>
          </div>
      </div>
      {/* Product */}
      <div >
        {totalProducts === 0 ? <h5 className='text-2xl mt-16'> Sorry No Products matched your search...</h5> :
        layout==="grid" ? <ProductsGrid /> : <ProductsList />}
      </div>
      
    </div>
  )
}

export default ProductsContainer

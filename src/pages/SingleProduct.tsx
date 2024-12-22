import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { customFetch, formatPrice } from '../utils'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const loader = async ({params})=>{
  console.log("Params: ",params)
  const response = await customFetch.get(`/products/${params.id}`);
  console.log(response);
  return {product: response.data.data}
}

const SingleProduct = () => {
  const {product} = useLoaderData();
  console.log("Product in component: ", product);
  const {image, title, price, description, colors, company} = product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  console.log("color: ",productColor)
  const handleAmount = (e)=>{
    console.log("amount: ", e);
    setAmount(parseInt(e.target.value));
  }

  return (
    <section >
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <img src={image} alt={title} className='w-96 h-96 object-cover rounded-lg lg:w-full' />
        {/* PRODUCT  */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>{company}</h4>
          <p className='mt-3 text-xl'>{dollarsAmount}</p>
          <p className='mt-6 leading-8'>{description}</p>

          {/* COLORS */}
          <div className="mt-6"> 
          <h4 className='text-md font-medium tracking-wider capitalize'>
            colors
          </h4>
          <div className="mt-2">
            {colors.map((color)=>{
              return (
              <button 
                key={color} 
                type='button'
                className={`badge w-6 h-6 mr-2 ${color === productColor && "border-2 border-secondary"}`}
                style={{backgroundColor: color}}
                onClick={()=>setProductColor(color)}
                >

                </button>)
            })}
          </div>
        
        </div>
        {/* Amount */}
            <div className='form-control w-full max-w-xs'>
              <label htmlFor="amount" className='label '>
                <h4 className='text-md font-medium tracking-wider capitalize'>
                  amount
                </h4>
              </label>
              <select name='amount' id='amount' value={amount} onChange={(e)=>handleAmount(e)} className='select select-secondary select-bordered select-md'>
                {[1,2,3].map((number)=>{
                  return(
                    <option value={number} key={number}>{number}</option>
                  )
                })}
              </select>
            </div>
        {/* Cart BTN */}
        <div className='mt-10'>
                <button className='btn btn-secondary btn-md' onClick={(e)=>console.log("event click: ",e)}>Add to bag</button>
        </div>
        </div>
        
     
      </div>
    </section>
  )
}

export default SingleProduct

import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { ComplexPaginationContainer, OrdersList, PaginationContainer, SectionTitle } from '../components';

export const loader = (store)=>async ({request})=>{
  const user = store.getState().userState.user;
  if(!user){
    toast.warn("Please logged in to view orders");
    redirect("/login");
  }
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]); //we do this to get data to pagination
  try{
    const response = await customFetch.get("/orders",{
      params,
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    });
    console.log("orders response: ", response);
    return {orders: response.data.data, meta:response.data.meta}
  }catch(error){
    const errorMessage = error?.response?.data?.error?.message || "There was an error placing your order";
    toast.error(errorMessage);
    if(error.response.status ===401 || 403){
        return redirect("/login")
    }
    
  }
  return null;

}

const Orders = () => {
  const {meta} = useLoaderData();
  
  if(meta.pagination.total<1){
    return <SectionTitle text="PLease make an order" />
  }

  return (
    <>
      <SectionTitle text="Your orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders

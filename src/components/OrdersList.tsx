import React from 'react'
import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const OrdersList = () => {
    const {orders, meta} = useLoaderData();  //{orders, meta} wolasz poniewaz w Orders.tsx w loaderze z response zwracasz return {orders: response.data.data, meta:response.data.meta} 
    
    return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>total Orders: {meta.pagination.total}</h4>
      <div className="overflow-x-auto">
        <table className='table table-zebra'>
            {/* HEAD */}
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Address
                    </th>
                    <th>
                        Products
                    </th>
                    <th>
                        Cost
                    </th>
                    <th className='hidden sm:block'>Date</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order)=>{
                    console.log("order: ", order)
                    const id = order.id;
                    const {name, address, numItemsInCart, orderTotal,createdAt} = order.attributes;
                    const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");

                    return <tr key={id}>
                        <td>{name}</td>
                        <td>{address}</td>
                        <td>{numItemsInCart}</td>
                        <td>{orderTotal}</td>
                        <td className='hidden sm:block'>{date}</td>
                    </tr>
                })}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersList

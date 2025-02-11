import React, { useEffect, useState } from 'react'
import './Orders.css'
import cross_icon from '../../assets/cart_cross_icon.png'

const Orders = () => {
  const [allOrders,setallOrders] = useState([])
  const FeachInfo = async ()=>{
    await fetch('http://localhost:4000/orders')
    .then((res)=>res.json())
    .then((data)=>{setallOrders(data)});
  }

  useEffect(()=>{
    FeachInfo();
  },[])

  const removeOrder = async (id) => {
    try {
        console.log('Removing order with ID:', id);

        const response = await fetch('http://localhost:4000/removeorder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: String(id) })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log('Order removed successfully');

        await FeachInfo(); // ✅ Fixed typo
    } catch (error) {
        console.error('Failed to remove order:', error);
    }
};

  // allproducts.map((pro,i)=>{

  //  pro.size.map((data)=>{
  //  console.log(data);
   
  //  })
  // })
  
  return (
    <div className='list-Product'>
     <h1>All Produt List</h1>
     <div className='Order-Product-format-main'>
      <p>Products</p>
      <p>User Details</p>
      <p>Remove</p>
     </div>
     <div className='listProduct-allproducts'>
      <hr/>
      {allOrders.map((order, index) => (
  <div key={index} className="Order-Product-format-main listproduct-format">
    
    {/* Ensure orderItems exists before mapping */}
    <div className=''>
    {order.orderItems && order.orderItems.map((item, i) => (
      <div key={i} className='items'>
        <p>{item.name}</p>
        <p >{item.price}</p>
        <p>{item.quantity}</p>
      </div>
    ))}
      </div>

    <div>
      <p>{order.name}</p>
      <p>{order.email}</p>
      <p>{order.number}</p>
      <p>{order.address}</p>
    </div>

    <img 
      onClick={() => removeOrder(order._id)} 
      src={cross_icon} 
      alt="Remove Order" 
      className="listproduct-remove-icon" 
    />
    <hr/>
  </div>
))}


     </div>
     
    </div>
  )
}

export default Orders
import React, { useEffect, useState } from 'react'
import './popular.css'
import Item from '../items/item'
function Popular() {
const [PopularProducts,setPopularProducts]=useState([]);

useEffect(()=>{
  fetch('https://shoppingcart-backend-spal.onrender.com/popularinwomen')
  .then((res)=>res.json())
  .then((data)=>setPopularProducts(data))

},[])


  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>
            {PopularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}


        </div>

    </div>
  )
}

export default Popular

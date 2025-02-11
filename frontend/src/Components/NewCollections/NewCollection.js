import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import Item from '../items/item'

function NewCollection() {
  const [new_collection,setNewCollection]=useState([]);
  useEffect(()=>{
    fetch('https://shoppingcart-backend-spal.onrender.com/newcollection')
    .then((res)=>res.json())
    .then((data)=>setNewCollection(data));
  },[])
  return (
    <div className='NewCollection'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className='Collections'>
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>

    </div>
  )
}

export default NewCollection

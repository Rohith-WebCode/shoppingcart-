import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cart_cross_icon.png'

const ListProduct = () => {
  const [allproducts,setallproducts] = useState([])
  const FeachInfo = async ()=>{
    await fetch('https://shoppingcart-backend-spal.onrender.com/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setallproducts(data)});
  }

  useEffect(()=>{
    FeachInfo();
  },[])

  const removeProduct = async (id)=>{
    await fetch('https://shoppingcart-backend-spal.onrender.com/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
   await FeachInfo();
  }
  // allproducts.map((pro,i)=>{

  //  pro.size.map((data)=>{
  //  console.log(data);
   
  //  })
  // })
  
  return (
    <div className='list-Product'>
     <h1>All Produt List</h1>
     <div className='list-Product-format-main'>
      <p>Products</p>
      <p>Title</p>
      <p>Old Price</p>
      <p>New Price</p>
      <p>Category</p>
      <p>Remove</p>
     </div>
     <div className='listProduct-allproducts'>
      <hr/>
      {allproducts.map((product,index)=>{
        return <> 
        <div key={index} className="list-Product-format-main listproduct-format">
          <img src={product.image} alt="" className="listproduct-product-icon" />
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>${product.new_price}</p>
          <p>{product.category}</p>
          <img onClick={()=>{removeProduct (product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
        </div>
        <hr/>
        </>
      })}

     </div>
     
    </div>
  )
}

export default ListProduct

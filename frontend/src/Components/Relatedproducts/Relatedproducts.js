import React, { useEffect, useState } from 'react'
import './Relatedproducts.css'
import Item from '../items/item';
function Relatedproducts(props) {
  // console.log('cat',props.category);
  // const {all_product} = useContext(ShopContext)
  const {product} = props;
  const [data_product,setdata_product] = useState([])
  useEffect(()=>{
    fetch('https://shoppingcart-backend-spal.onrender.com/relatedproducts',{
      method:'POST',
      headers:{
          Accept:'application/form-data',
         'Content-Type':'application/json', 
      },
     
      body:JSON.stringify({"category":product.category}),
  })
  .then((res)=>res.json())
  .then((data)=>setdata_product(data))
  

  },[])
  
  return (
    <div className='Relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className='Relatedproducts-item'>
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}

        </div>
    </div>
  )
}

export default Relatedproducts

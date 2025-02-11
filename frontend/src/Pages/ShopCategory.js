import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import {ShopContext} from '../Context/ShopContext'
import Beauty_banner from '../Components/Banner/BeautyBanner/BeautyBanner';
import Dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/items/item';

function ShopCategory(props) {
  const {all_product} = useContext(ShopContext)
  // console.log('data',all_product);
  // console.log('cat',props.category);
  return (
    <div className='Shop-Category'>
      {props.banner==='beauty' ?<Beauty_banner/>: <img src={props.banner} className='ShopCategory-banner'/>}
     <div className='ShopCategory-indexSort'>
      <p>
        <span>Showing 1-12</span> Out of 36 product
      </p>
      <div className='ShopCategory-sort'>
        Sort by <img src={Dropdown_icon} alt=''/>

      </div>
     </div>
     <div className='ShopCategory-products'>
      {all_product.map((item,i)=>{
        
        if(props.category===item.category){
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        }
        else{
          return null;
        }

      })}
     </div>
     <div className='ShopCategory-loadmore'>
      Explore More
     </div>
      

    </div>
  )
}

export default ShopCategory
import React, { useContext, useState,useEffect} from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

function ProductDisplay(props) {
    const {product} = props 
    const {addToCart} = useContext(ShopContext)
    const [size,SetSize] = useState("xl")
    const [user,setUser] = useState()
    const navigate = useNavigate();

      let data = localStorage.getItem('username')
      useEffect(() => {
        setUser(data)
        },[data]);       
  return (
    <div className='ProductDisplay'>
        <div className='ProductDisplay-left'>
            <div className='ProductDisplay-img-list'>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            <img src={product.image} alt=''/>
            </div>
            <div className='ProductDisplay-img'>
                <img className='ProductDisplay-main-img' src={product.image} alt=''/>
            </div>
        </div>
        <div className='ProductDisplay-right'>
            <h1>{product.name}</h1>
            <div className='ProductDisplay-right-stars'>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_dull_icon} alt=''/>
                <p>(150)</p>
            </div>
            <div className='ProductDisplay-right-prices'>
                <div className='ProductDisplay-right-prices-old'>${product.old_price}</div>
                <div className='ProductDisplay-right-prices-new'>${product.new_price}</div>
            </div>
            <div className='ProductDisplay-right-description'>
            Black, Regular fit, Full-zip closure, Hood with external drawcords for customized fit,
             Ribbed cuffs and hem for snug fit, Kangaroo pockets for storage, PUMA wordmark at left chest
            </div>
            <div className='ProductDisplay-right-size'>
                <h1>Select Size</h1>
                <div className='ProductDisplay-right-sizes'>
                    {product.size?.map((size)=>(
                        <div key={size} onClick={()=>{SetSize(size)}}>{size}</div>
                    ))}
                </div>
            </div>
            
            <button onClick={()=>{user ? addToCart(product.id,size):navigate('/Login')}}>ADD TO CART</button>
            <p className='ProductDisplay-right-category'><span>category :</span>Women , T-Shirt, Crop Top</p>
            <p className='ProductDisplay-right-category'><span>Tags :</span>Modern , latest</p>

        </div>
    </div>
  )
}

export default ProductDisplay
import React from 'react'
import './BeautyBanner.css'
import Trendy from '../img/Trendy Accessories  Banner.png'
import Neutral from '../img/Neutral Accessories  Sale Banner.png'
import Shoes from '../img/Shoes Sale Banner.png'


function MenBanner() {
  return (
   
       <div className='slider_container-beauty'>
        <div className="slider">
        <div className="slide two">
          <img src={Trendy} alt="" />
          
        </div>
        <div className="slide three">
          <img src={Neutral} alt="" />
         
        </div>
        <div className="slide four">
        <img src={Shoes} alt="" />
          
        </div>
      
      </div>

      </div>

     
    
  )
}

export default MenBanner
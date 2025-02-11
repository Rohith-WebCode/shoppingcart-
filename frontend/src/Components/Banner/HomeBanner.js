import React from 'react'
import './Banner.css'
import NewCollection from './img/NewCollection Banner.png'
import SpecialOffer from './img/Special Offer Sale Banner.png'
import Summer from './img/Summer Banner.png'

function MenBanner() {
  return (
   
       <div className='slider_container'>
        <div className="slider">
        <div className="slide two">
          <img src={SpecialOffer} alt="" />
          
        </div>
        <div className="slide three">
          <img src={Summer} alt="" />
         
        </div>
        <div className="slide four">
        <img src={NewCollection} alt="" />
          
        </div>
      
      </div>

      </div>

     
    
  )
}

export default MenBanner
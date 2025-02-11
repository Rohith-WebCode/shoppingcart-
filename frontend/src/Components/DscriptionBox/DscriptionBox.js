import React from 'react'
import './DscriptionBox.css'

function DscriptionBox() {
  return (
    <div className='DscriptionBox'>
      <div className='DscriptionBox-navigator'>
        <div className='DscriptionBox-nav-box'>Dscription</div>
          <div className='DscriptionBox-nav-box fade'> Reviews (12) </div>
         </div>
         <div className='DscriptionBox-dscription'>
          <p>An e-commerce website, simply put, is an online store. It's a platform where goods and services are traded between buyers and sellers over the internet. 
          Unlike a physical storefront, an e-commerce website can be accessed at any time, from anywhere, as long as there's an internet connection. 
          As a digital shopfront displays products or services, allows users to select and purchase them and facilitates the acceptance of payments. </p>
          <p>
          Much like a traditional physical retail store, e-commerce websites allow consumers and businesses to buy and sell to one another on a designated platform.
          The main difference between e-commerce and physical commerce, however, 
          is that e-commerce transactions occur entirely over the internet rather than at a brick-and-mortar location.
          </p>
         </div>
    </div>
  )
}

export default DscriptionBox
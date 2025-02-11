import React from 'react'
import HomeBanner from '../Components/Banner/HomeBanner'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/OffersBanner/Offers'
import NewCollection from '../Components/NewCollections/NewCollection'
import Newsletter from '../Components/NewsLetter/Newsletter'
import '../App.css'


function Shop() {
  return (
    <div className='Shop'>
        <HomeBanner/>
        <Popular/>
        <Offers/>
        <NewCollection/>
        <Newsletter/>
    </div>
  )
}

export default Shop
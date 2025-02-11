import React from 'react'
import './Navbar.css'
import Navlogo from '../../assets/shelftop-logo.png'
import NavProfile from '../../assets/admin-icon.png'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <img src={Navlogo} className='nav-log' />
      <img src={NavProfile} alt='' className='nav-rofile'/> 
        
    </div>
  )
}

export default Navbar
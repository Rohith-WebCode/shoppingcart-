import React from 'react'
import './footer.css'
import Footer_logo from '../Assets/shelftop-logo.png'
import Insta_icon from '../Assets/instagram_icon.png'
import Pintester_icon from '../Assets/pintester_icon.png'
import Whatsapp_icon from '../Assets/whatsapp_icon.png'
import { useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/login") return null;
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={Footer_logo} alt=''/>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className='footer-social-icon'>
        <div className='footer-icons'>
          <img src={Insta_icon} alt=''></img>
        </div>
        <div className='footer-icons'>
          <img src={Pintester_icon} alt=''></img>
        </div>
        <div className='footer-icons'>
          <img src={Whatsapp_icon} alt=''></img>
        </div>
      </div>
      <div className='footer-copyrigt'>
        <hr/>
        <p>Copyrigt @ 2024 - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
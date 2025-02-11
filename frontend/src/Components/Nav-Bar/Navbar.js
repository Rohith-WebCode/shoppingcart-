import React,{useContext, useRef, useState} from 'react'
import './Navbar.css'
import Logo from '../Assets/shelftop-logo.png'
import Profile from '../Assets/User-Profile-Logo.png'
import Cart from '../Assets/shopping-cart-icon.webp'
import Search from '../Assets/search-icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import menu_icon from '../Assets/hamburger-menu-.png'
import { useEffect } from 'react'

function Navbar() {
  const [manu, setManu] = useState('shop')
  const {getTotelCartitem,search} = useContext(ShopContext)
  const menuRef = useRef();
  const searchRef = useRef();
  const [user, setUser] = useState()
  const [searchQuery, setSearchQuery] = useState()

  const handleSearch = ()=>{
    // console.log(searchQuery);
    if (!searchQuery || !searchQuery.trim()) {
      alert("Please enter a search term");
      return;
  }
    search(searchQuery)

  }

  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle('mySidenav');
   
  }
  const closeNav =(e)=>{
    menuRef.current.classList.toggle('mySidenav');
  }
  let data = localStorage.getItem('username')
  useEffect(() => {
    setUser(data)
    }, []);
  return (
    <div>
    <div className='navbar'>
     

<div  ref={menuRef}  className="sidenav">
<div className=''>
          <Link to='/' onClick={()=>{setManu('Logo')}}><img src={Logo} alt='Logo' className='menu-Logo'/></Link> 
        </div>
  <ul  class="small-menu-links">
          <li href="" className="closebtn" onClick={closeNav}>&times;</li>
          <li onClick={()=>{setManu('MEN')}}> <Link to='/mens' style={{textDecoration:'none'}}>MEN</Link> {manu==="MEN"?<hr/>:<></>}</li>
          <li onClick={()=>{setManu('WOMEN')}}><Link to='/womens' style={{textDecoration:'none'}}>WOMEN</Link> {manu==="WOMEN"?<hr/>:<></>}</li>
          <li onClick={()=>{setManu('KIDS')}}><Link to='/kids' style={{textDecoration:'none'}}>KIDS</Link> {manu==="KIDS"?<hr/>:<></>}</li>
          <li onClick={()=>{setManu('BEAUTY')}}><Link to='/beauty' style={{textDecoration:'none'}}>BEAUTY</Link> {manu==="BEAUTY"?<hr/>:<></>}</li>
        </ul>
     
</div>
<img  src={menu_icon} alt='' onClick={dropdown_toggle} className='new-dropdown'/>
         <div className='nav-logo'>
          <Link to='/' onClick={()=>{setManu('Logo')}}><img src={Logo} alt='Logo' className='Logo'/></Link> 
        </div>
       
        <ul  className="nav-menu">
          <li onClick={()=>{setManu('MEN')}}> <Link to='/mens' style={{textDecoration:'none'}}>MEN</Link> {manu==="MEN"?<hr/>:<></>}</li>
          <li onClick={()=>{setManu('WOMEN')}}><Link to='/womens' style={{textDecoration:'none'}}>WOMEN</Link> {manu==="WOMEN"?<hr/>:<></>}</li>
          <li onClick={()=>{setManu('KIDS')}}><Link to='/kids' style={{textDecoration:'none'}}>KIDS</Link> {manu==="KIDS"?<hr/>:<></>}</li>
          <li onClick={()=>{setManu('BEAUTY')}}><Link to='/beauty' style={{textDecoration:'none'}}>BEAUTY</Link> {manu==="BEAUTY"?<hr/>:<></>}</li>
        </ul>
        <div ref={searchRef} className='Search'>
          
            <input type="search" placeholder='Search for products brands and more' className='input' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <a className='submit' onClick={handleSearch}>
            <img src={Search} alt="" className='Searchicon' />
            </a>
          
        </div> 
        <div className="login-cart">
        <div className="dropdown">
        <div className='Profile dropbtn'>
          <img src={Profile} alt='Profile' className='ProfileLogo'/>
          <h2>Profile</h2>
        
        <div className='dropdown-content'>
        {user?<div>
          <div className='usernameDiv'><h2>Hello </h2><p className='username'>{user}</p></div>
          <button className='Logout' onClick={()=>{localStorage.clear();window.location.replace('/')}}>Logout</button>
          </div>
        :
        <div>
        <h2>Welcome</h2>
          <p>To access account and manage orders</p>
          <Link to='/login' style={{textDecoration:'none'}}><button className='Login-SignUp'>Login/SignUp</button></Link> 
        </div>
}
         
        </div>
        </div>
         </div>
           
          <div className='Cart'>
          <div className='nav-cart-count'>{getTotelCartitem()}</div>
          <Link to='/cart' style={{textDecoration:'none'}}><img src={Cart} alt="Cart" className='CartLogo'/>
            <h2 className='Cart'>Cart</h2></Link>  
            
          

          </div>
          

        </div>
        <div ref={searchRef} className='Search-menu'>
          
          <input type="search" placeholder='Search for products brands and more' className='input'/>
          <a className='submit'>
          <img src={Search} alt="" className='Searchicon' />
          </a>
        
      </div> 
      

    </div>
    
    </div>
  )
}

export default Navbar
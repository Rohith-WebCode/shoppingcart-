import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/add_products.png'
import list_product_icon from '../../assets/products_list_icon.png'
const sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={add_product_icon}alt=''/>
            <p>Add Product</p> 
        </div>
        
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={list_product_icon}alt=''/>
            <p>Product List</p>

        </div>
        
        </Link>
        <Link to={'/orders'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={list_product_icon}alt=''/>
            <p>User Orders</p>

        </div>
        
        </Link>

    </div>
  )
}

export default sidebar
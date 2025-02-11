import React from 'react'
import './Admin.css'
import Sidebar from '../../componets/Sidebar/sidebar'
import { Routes,Route } from 'react-router-dom' 
import Addproduct from '../../componets/Addproduct/Addproduct'
import ListProduct from '../../componets/ListProduct/ListProduct'
import Orders from '../../componets/Orders/Orders'
const Admin = () => {
  return (
    <div className='Admin'>
        <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={<Addproduct/>}/>
          <Route path='/listproduct' element={<ListProduct/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
    </div>
  )
}

export default Admin
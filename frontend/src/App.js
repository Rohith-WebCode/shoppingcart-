import './App.css';
import Navbar from './Components/Nav-Bar/Navbar';
import {BrowserRouter ,Route,Routes}from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import SignUpLogin from './Pages/SignUpLogin';
import Footer from './Components/Footer/Footer';
import Men_banner from './Components/Banner/img/Men Banner Landscape.png';
import Women_banner from './Components/Banner/img/Women Banner Landscape (1).png';
import Kids_banner from './Components/Banner/img/_Kids Fashion Banner .png';
import { Orders } from './Components/Orders/Orders';
import SearchPage from './Pages/SearchPage';






function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
     <Routes>
        <Route path='/' element={<Shop />}></Route>
      </Routes>
     <Routes>
        <Route path='/mens' element={<ShopCategory banner={Men_banner} category="Men"/>}></Route>
      </Routes>
     <Routes>
        <Route path='/womens' element={<ShopCategory banner={Women_banner} category="Women"/>}></Route>
      </Routes>
     <Routes>
        <Route path='/kids' element={<ShopCategory banner={Kids_banner} category="Kid"/>}></Route>
      </Routes>
     <Routes>
        <Route path='/beauty' element={<ShopCategory banner='beauty' category="Beauty"/>}></Route>
      </Routes>
     <Routes>
        <Route path='/product/:productid' element={<Product/>}></Route>
      </Routes>
     <Routes>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
     <Routes>
        <Route path='/login' element={<SignUpLogin/>}></Route>
      </Routes>
     <Routes>
        <Route path='/order' element={<Orders/>}></Route>
      </Routes>
     <Routes>
        <Route path='/search' element={<SearchPage/>}></Route>
      </Routes>
     <Footer/>
      </BrowserRouter>
   
    </div>
  );
}

export default App;

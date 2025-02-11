import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DscriptionBox from '../Components/DscriptionBox/DscriptionBox';
import Relatedproducts from '../Components/Relatedproducts/Relatedproducts';

function Product() {
    const {all_product} = useContext(ShopContext)
    const {productid} = useParams();
  
    const product = all_product.find((e)=>e.id===Number(productid))
    const [data_product,setdata_product] = useState(() => {
    const savedProduct = localStorage.getItem('product');
    return savedProduct ? JSON.parse(savedProduct) : {};
  });
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://shoppingcart-backend-spal.onrender.com/ProductDisplay', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productid }),
        });
        const data = await response.json();
        setdata_product(data);
        localStorage.setItem('product', JSON.stringify(data)); 
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productid]);
  if (!data_product || Object.keys(data_product).length === 0) {
    return <div>Loading...</div>;
  }
   
  return (
    <div>
      <Breadcrum product={data_product}/>
      <ProductDisplay product={data_product}/>
      <DscriptionBox/>
      <Relatedproducts product={data_product}/>
    </div>
  )
}

export default Product

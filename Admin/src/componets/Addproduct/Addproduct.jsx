import React, { useState } from 'react'
import './Addproduct.css'
import uplode_icon from '../../assets/Upload-photo-icon.png'

const Addproduct = () => {
  const [image,setImage] = useState(false);
  const [productDetails,setProductDetails] =useState({
    name:"",
    image:"",
    category:"Women",
    size:[],
    new_price:"",
    old_price:""
  })
  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
  }
  const changeHandler = (e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
    // Handle checkbox selections
    const sizeHandler = (e) => {
      const { value, checked } = e.target;
      setProductDetails((prevDetails) => {
        let updatedSizes = [...prevDetails.size];
        if (checked) {
          updatedSizes.push(value);
        } else {
          updatedSizes = updatedSizes.filter((size) => size !== value);
        }
        return { ...prevDetails, size: updatedSizes };
      });
    };
  const add_Product =async ()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    
    let formData = new FormData();
    formData.append('product',image);
    console.log(formData);
    

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((res)=>res.json()).then((data)=>{responseData=data})
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
      }).then((res)=>res.json()).then((data)=>{
        data.success?alert("Product Added"):alert('Product Added Failed')
      })
    }
  }
  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here'/>
      </div>
      <div className='addproduct-Price'>
        <div className='addproduct-itemfield'>
        <p>Price</p>
        <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
        </div>
        <div className='addproduct-itemfield'>
        <p>Offer Price</p>
        <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
          <option value='Women'>Women</option>
          <option value='Men'>Men</option>
          <option value='Kid'>Kid</option>
          <option value='Beauty'>Beauty</option>
        </select>
      </div>
    {/* Product Size Selection */}
    <div>
        <p className='size'>Sizes:</p>
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <label className='size' key={size}>
            <input className='size' type='checkbox' value={size} checked={productDetails.size.includes(size)} onChange={sizeHandler} /> {size}
          </label>
        ))}
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img src={image?URL.createObjectURL(image):uplode_icon} alt='' className='addproduct-thumnail-img'/>
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{add_Product()}} className='addproduct-button'>ADD</button>
    </div>
  )
}

export default Addproduct
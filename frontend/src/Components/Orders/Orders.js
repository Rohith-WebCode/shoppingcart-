import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import arrow_icon from '../Assets/32213.png'
import visa_icon from '../Assets/visa_icon.png'
import mastercard from '../Assets/MasterCard.png'
import Gif from '../Assets/Order.gif'
import { ShopContext } from '../../Context/ShopContext'
export const Orders = () => {
  const { all_product, cartItems,user,userID} = useContext(ShopContext);
//   const [data,setData] = useState()
  const [orderSuccess, setOrderSuccess] = useState(false); // ✅ New state

  const cartData = user?.userData?.cartData || {}; 
  
  let orderItems = [];
  Object.entries(cartData).forEach(([itemId, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {

        // console.log('Searching for product with ID:',typeof itemId);

        // Correctly find the product
        const product = all_product.find(p => {
            // console.log('Checking product ID:', p.id);
            return String (p.id) === itemId; // ✅ Proper condition
        });

        // console.log('Found product:', product);
          orderItems.push({
              product: itemId, // ✅ MongoDB Product ID
              name: product?.name || "Unknown Product", // ✅ Add product name
              size: size,
              quantity: quantity,
              price: product?.new_price || 0
          });
      });
  }); 
  console.log('dsggsg',orderItems);
  const [OrderDetails, setOrderDetails] = useState({
      user: userID,
      orderItems: orderItems, 
      name: "",
      email: "",
      number: 0, 
      address: "",
      paymentmethod: ""
  }); 
  useEffect(() => {
    if (user?.userData) {
        setOrderDetails(prev => ({
            ...prev,
          user: user.userData._id || "",  // ✅ Ensure it's never undefined
            orderItems: [...orderItems],  // ✅ Ensure orderItems is an array
            name: user.userData.name || "",
            email: user.userData.email || "",
            number: user.userData.number || 0,
            address: user.userData.address || "",
        }));
    }
}, [user, cartData, all_product]);
  const changeHandler = (e) => {
    if(e.target.name==="paymentmethod" && e.target.value === "online payment"){
        alert("Warning: Online payment is not available currently. Please choose another method.");
        return;
    }
      setOrderDetails({
          ...OrderDetails,
          [e.target.name]: e.target.type === "radio" ? e.target.value : e.target.value,
      });
  };
  const validateForm = () => {
    if (!OrderDetails.name.trim()) {
        alert("Please enter your name.");
        return false;
    }
    if (!OrderDetails.email.trim() || !/\S+@\S+\.\S+/.test(OrderDetails.email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!OrderDetails.number || OrderDetails.number.toString().length < 10) {
        alert("Please enter a valid phone number (at least 10 digits).");
        return false;
    }
    if (!OrderDetails.address.trim()) {
        alert("Please enter your address.");
        return false;
    }
    if (!OrderDetails.paymentmethod) {
        alert("Please select a payment method.");
        return false;
    }
    if (OrderDetails.orderItems.length === 0) {
        alert("Your cart is empty. Please add items before ordering.");
        return false;
    }
    return true;
};
  const confirmOrder = async () => {
        if (!validateForm()){
            return;
        } 
        else{
            try {
                const response = await fetch("https://shoppingcart-backend-spal.onrender.com/placeorder", {
                 method: "POST",
                 headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                    body: JSON.stringify(OrderDetails)
                });
                const responseData = await response.json();
                if (response.ok && responseData.success) {
                    console.log("Order Placed Successfully!");
                    setOrderSuccess(true); 
                    setTimeout(() => setOrderSuccess(false), 4000);
                } else {
                    alert(responseData.error || "Failed to place order");
                }
            } catch (error) {
                console.error("Error placing order:", error);
                alert("Something went wrong. Please try again.");
            }
        };
        }
  return (
    <>
    {orderSuccess ? (
        <div className="order-success">
            <img src={Gif} 
                alt="Order Success" 
                className="success-gif" width={"100%"}/>
        </div>
    ) :(
    <div className='Orders'>
        <div className='header-section'>
              <button className='arrow_button'><img src={arrow_icon} className='arrow_icon' /></button>
              <h1>Checkout and Order Confirmation</h1>
          </div>
          <div className='the-order-section'> 
              <div className='the-address-section'>
                  <h1>Personal info</h1>
                  <div className='input-section'>
                      <p>Name*</p>
                      <input type='text' name="name" value={OrderDetails.name} onChange={changeHandler} className='info_input' placeholder='Name' required/>
                  </div>
                  <div className='input-section'>
                      <p>Email Address*</p>
                      <input type='text' name="email" value={OrderDetails.email} onChange={changeHandler} className='info_input' placeholder='email@gmail.com' required />
                  </div>
                  <div className='input-section'>
                      <p>Phone Number*</p>
                      <input type='number' name="number" value={OrderDetails.number} onChange={changeHandler} className='info_input' placeholder='1234' required/>
                  </div>
                  <div className='input-section'>
                      <p>Address*</p>
                      <input type='text' name="address" value={OrderDetails.address} onChange={changeHandler} className='info_input' placeholder='Address' required/>
                  </div>
              </div>

              <div className='method-conform_section'>
                  <h1>Payment Method</h1>
                  <div className='Payment-section'>
                      <input type='radio' name='paymentmethod' value="online payment" onChange={changeHandler} checked={OrderDetails.paymentmethod === "online payment"}/>
                      <p>Debit card/Credit card/ Visa</p>
                      <img src={visa_icon} className='payemnt_logo' />
                      <img src={mastercard} className='payemnt_logo' />
                  </div>
                  <div className='Payment-section'>
                      <input type='radio' name='paymentmethod' value="COD" onChange={changeHandler} checked={OrderDetails.paymentmethod === "COD"} required/>
                      <p>COD-Cash On Delivery</p>
                  </div>
                  <button className='confirm-button' onClick={confirmOrder}>Confirm Order</button>
              </div>
          </div>
        </div>
        )}
            </>
  );
};


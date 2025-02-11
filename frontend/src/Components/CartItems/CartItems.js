import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from 'react-router-dom'
function CartItems() {
  const { all_product, cartItems, getTotalCartAmount, removeFromCart, addToCart, clearFromCart } = useContext(ShopContext);
  return (
      <div className='CartItems'>
          <div className='CartItems-format-main'>
              <p>Products</p>
              <p>Title</p>
              <p>Size</p>  {/* Fixed: Added Size Column */}
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
          </div>
          <hr />

          {all_product.map((product) => {
              if (cartItems[product.id]) {
                  return Object.entries(cartItems[product.id]).map(([size, quantity]) => (
                      <div key={`${product.id}-${size}`}>
                          <div className='CartItems-format CartItems-format-main'>
                              <img src={product.image} alt='' className='carticon-product-icon' />
                              <p>{product.name}</p> {/* Fixed: Display correct title */}
                              <p>{size}</p> {/* Fixed: Display selected size */}
                              <div className='quantity'>    
                                  <button className='quantity-minus' onClick={() => removeFromCart(product.id, size)}>-</button>
                                  <button className='CartItems-quantity'>{quantity}</button> {/* Fixed: Display correct quantity */}
                                  <button className='quantity-plus' onClick={() => addToCart(product.id, size)}>+</button>
                              </div>
                              <p className='total'>$ {product.new_price * quantity}</p> {/* Fixed: Correct price calculation */}
                              <p className='Remove' onClick={() => clearFromCart(product.id, size)}>Remove</p>
                              <img className='CartItems-remove-icon' src={remove_icon} onClick={() => clearFromCart(product.id, size)} alt='' />
                          </div>
                          <hr />
                      </div>
                  ));
              }
              return null;
          })}

          <div className='CartItems-down'>
              <div className='CartItems-total'>
                  <h1>Cart Totals</h1>
                  <div>
                      <div className='CartItems-total-item'>
                          <p>Subtotal</p>
                          <p>${getTotalCartAmount()}</p>
                      </div>
                      <hr />
                      <div className='CartItems-total-item'>
                          <p>Shipping fee</p>
                          <p>Free</p>
                      </div>
                      <hr />
                      <div className='CartItems-total-item'>
                          <h3>Total</h3>
                          <h3>${getTotalCartAmount()}</h3>
                      </div>
                  </div>
                  
                  <Link to='/order' style={{textDecoration:'none'}}><button>PROCEED TO CHECKOUT</button></Link>
              </div>
              <div className='CartItems-promocode'>
                  <p>If you have a promo code, Enter it here</p>
                  <div className='promobox'>
                      <input type='text' placeholder='Promo Code' />
                      <button>Submit</button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default CartItems;

import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data, setdata] = useState({
      first_name:"",
      last_name:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zip_code:"",
      country:"",
      phone:""
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const PlaceOrder = async (e) => {
      e.preventDefault();
      
      if (!cartItems || Object.keys(cartItems).length === 0) {
          alert("Your cart is empty.");
          return;
      }
      
      let orderItems = [];
      food_list.forEach((item) => {
          if (cartItems[item._id] > 0) {
              let itemInfo = { ...item, quantity: cartItems[item._id] };
              orderItems.push(itemInfo);
          }
      });
  
      let orderData = {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount() + 2
      };
  
      try {
          let response = await axios.post(url + "/api/order/place", orderData, {
              headers: { Authorization: `Bearer ${token}` }
          });
  
          if (response.data.success) {
              const { session_url } = response.data;
              window.location.replace(session_url);
          } else {
              toast.success("Food ordered successfully.")
              
          }
      } catch (error) {
          console.error("Error placing order:", error);
          alert("An error occurred while placing the order. Please try again.");
      }
  };
  
  

  return (
    <form onSubmit={PlaceOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='first_name' value={data.first_name} type="text" placeholder='First Name' required/>
          <input onChange={onChangeHandler} name='last_name' value={data.last_nameL} type="text" placeholder='Last Name' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email' required />
        <input onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='city' value={data.city}  type="text" placeholder='City' required />
          <input onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='zip_code' value={data.zip_code} type="text" placeholder='Zip code' required />
          <input onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={data.phone} type="number" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount()>0?2:0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()>0?getTotalCartAmount()+2:0}</b>
            </div>
          </div>
              <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
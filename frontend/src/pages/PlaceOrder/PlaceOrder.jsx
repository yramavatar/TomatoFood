

import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
 
 
const PlaceOrder = () => {

   const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
   
   const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
   })

   // by this method we will save the data to input field variable

     const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))

     }
     // to verify it creating useeffect
    //  useEffect(()=>{
    //   console.log(data);
    //  },[data])

      // for placing the order AND THIS WHICH I ADDED 

      /*const placeOrder = async(event)=>{
         event.preventDefault();   // it will not reload the oage when we submit the form
         let orderItems = [];
         food_list.map((item)=>{
             if(cartItems[item._id]>0){
               let itemInfo = item;
               itemInfo["quantity"] = cartItems[item._id]
               orderItems.push(itemInfo);
             }
         })

         // console.log(orderItems);
         let orderData = {
          address:data,
          items:orderItems,
          amount:getTotalCartAmount()+2,

         }

         // to send it to api
         let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
         if(response.data.success){
          const {session_url} =response.data;
          window.location.replace(session_url); // here we are sending users to session url
         }
         else{
          alert("Error")
         }

      }*/
  
      const placeOrder = async (event) => {

        event.preventDefault(); // Prevent page reload on form submission
       
        // Create a new array by filtering and mapping the items with quantity
      
        let orderItems = food_list
      
          .filter((item) => cartItems[item._id] > 0) // Only include items with a positive quantity
      
          .map((item) => ({
      
            ...item, // Create a new object to avoid mutating the original `item`
      
            quantity: cartItems[item._id], // Add the quantity from cartItems
      
          }));
       
        // Construct the order data
      
        let orderData = {
      
          address: data,
      
          items: orderItems, // Include the items with their quantities
      
          amount: getTotalCartAmount() + 2, // Calculate the total amount
      
        };
       
        try {
      
          // Send the order to the backend API
      
          let response = await axios.post(url + "/api/order/place", orderData, {
      
            headers: { token },
      
          });
       
          // If successful, redirect to the session URL for Stripe checkout
      
          if (response.data.success) {
      
            const { session_url } = response.data;
      
            window.location.replace(session_url);
      
          } else {
      
            alert("Error");
      
          }
      
        } catch (error) {
      
          console.error("Error placing order:", error);
      
          alert("Error placing order");
      
        }
      
      };
      
          // use navigate hook
          const navigate = useNavigate();
         useEffect (()=>{
            if (!token) {
               navigate('/cart')
            }
             else if(getTotalCartAmount()===0){
              navigate('/cart')
             }
         },[token])    // it will exceutewhen token gets in



  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
            
          </div>
           <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
           <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
           <div className="multi-fields">
            <input required  name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
            <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
              <div className="cart-total-details">
                   <p>Subtotal</p>
                   <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                   <p>Delivery Fee</p>
                   <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                   <b>Total</b>
                   <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
              </div>
              <button type='submit'>PROCEED TO PAYMENT</button>
            </div>

      </div>
     </form>
  )
}
 
export default PlaceOrder







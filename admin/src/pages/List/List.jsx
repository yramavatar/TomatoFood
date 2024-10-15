import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = ({url}) => {
     // const url = "http://localhost:4000"

   const[list,setList] = useState([]);
   const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);    // by hitting this we will get food items data 
       //console.log(response.data);
     if(response.data.success){
         setList(response.data.data);
     }
       else {
           toast.error("something went wrong");
       }
   }

     // to remove an item from database and api call

       const removeFood = async(foodId)=>{
           // console.log(foodId);
             const  response = await axios.post(`${url}/api/food/remove`,{id:foodId});
             await fetchList();
             if(response.data.success){
              toast.success(response.data.message);
             }
              else{
                toast.error("Error");
              }
       }
     
   // to use effect whenever the webpages loaded

     useEffect(()=>{
        fetchList();       // whenever this funciton is excuted the fetclist will be automatically once
     },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
       </div>
       {list.map((item,index)=>{                        // passing individual item and index number
           return(
            <div key={index} className='list-table-format'>
               <img src={`${url}/images/`+item.image}   alt="" />
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>${item.price}</p>
               <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
           )

       })}
      </div>
    </div>
  )
}

export default List




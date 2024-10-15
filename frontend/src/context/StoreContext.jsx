 
import { createContext,  useEffect,  useState } from "react";
// import {food_list} from "../assets/assets";
import axios from "axios"


export const StoreContext = createContext(null)


const StoreContextProvider=(prop)=>{

    const[cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"  // connecting with backend 
    const [token,setToken] = useState("");

    // to get the data from database
     const [food_list,setFoodList] = useState([]);
     

    const addToCart = async(itemId)=> {
          if(!cartItems[itemId]){    // if user first time add cart item it will be executed check if is null cart
            setCartItems((prev)=>({...prev,[itemId]:1}))
          }
          else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) // The spread operator is used to copy all the properties from the prev object into the new object.
          }
          // updating the item and saving into database
           if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})

           }

    }


      // remove from cart and updating it also in database 
      const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }


      }

       const getTotalCartAmount=() =>{
        let totalAmount = 0;
        for(const item in cartItems)
          {
             if(cartItems[item] >0){
              let itemInfo = food_list.find((product)=> product._id === item);
              totalAmount += itemInfo.price * cartItems[item];
             }
            
          }
          return totalAmount;

       }

       // to get the food item from backend database
         const fetchFoodList = async()=>{
            const response = await axios.get(url+"/api/food/list")
            setFoodList(response.data.data);
         }

         // after refreshing the webpage added cart item would be show the no of cart item is added
         const loadCartData = async(token)=>{
          const response = await axios.post(url+"/api/cart/get",{},{headers:{token}}); 
          setCartItems(response.data.cartData);

         }

       // to not logout by refreshing the webpage
       useEffect(()=>{
              
              async function loadData(){
                await fetchFoodList();
                if(localStorage.getItem("token")){
                  setToken(localStorage.getItem("token"));
                  await loadCartData(localStorage.getItem("token"));
                }
              }
              loadData();
       },[])

    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    }
    
     return (
        <StoreContext.Provider value={contextValue}>
            {prop.children}
        </StoreContext.Provider>
     )
}

export default StoreContextProvider






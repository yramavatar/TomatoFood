import useModel from "../models/userModel.js"



 // add to cart  ; add item to user cart
  const addToCart = async(req,res)=>{
    try {
        let userData = await useModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;   // new entry will be created if there is no item in the cart
        }

         else{
             cartData[req.body.itemId] += 1;
         }
           await useModel.findByIdAndUpdate(req.body.userId,{cartData}); // update the  cart data in database 
           res.json({success:true, message:"Added to cart"}); // to show message
    } catch (error) {
        console.log(error);
        res.json({success:false,message : "Error"});
    }

  }

  // remove item from userCar

  const removeFromCart = async(req,res)=>{
     try {
        let userData = await useModel.findById(req.body.userId)  // user id is fetch by middlware that decode the token  and convert into user id
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;

        }
         await useModel.findByIdAndUpdate(req.body.userId,{cartData});
         res.json({success:true,message:"Removed From Cart"})

        
     } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
        
     }

  }


  // fetch user cart data
  const getCart = async(req,res)=>{
    try {
        let userData = await useModel.findById(req.body.userId);
        let cartData = await userData.cartData; // using this user's cart data will be fetched and stored 
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

  }


    export {addToCart,removeFromCart,getCart}



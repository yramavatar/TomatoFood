import foodModel from "../models/foodModel.js";
import fs from 'fs' // prebuilt in node js 

// adding food item  using arrow function  


  const addFood = async (req,res) =>{
    
    let image_filename = `${req.file.filename}`;     // to use uploaded file in this variable

      const food = new foodModel({
         name:req.body.name,
         description: req.body.description,
         price: req.body.price,
         category: req.body.category,
         image:image_filename
      })

        try {
            await food.save();   // food item will be saved in database 
            res.json({success:true, message:"Food Added"})
        }  catch (error){
              console.log(error)
              res.json({success:false, message:"something went wrong"})
        }
  }
    // to create list food api endpoints using that we can list the all food item
     const listFood = async (req,res) =>{
        try{
            const foods = await foodModel.find({});
            res.json({success:true,data:foods})
        }  catch(error){
              console.log(error);
              res.json({success:false, message:"somewthing went wrong,Please check error log"})
        }

     }

       //  to remove food item api endpoint  
       const removeFood = async (req,res) =>{
             try {
                const food = await foodModel.findById(req.body.id)  // it is use for finding the unuiqre id for which to be deleted
                fs.unlink(`uploads/${food.image}`,()=>{})   // by using this we can delete the image form the folder
                await foodModel.findByIdAndDelete(req.body.id) // if this fails then catch block will be executed 

                res.json({success:true,message:"Food item has been successfully removed"})

             } catch (error) {
                console.log(error)
                res.json({success:false, message:"Something went wrong"})
             }
       }

  export {addFood,listFood,removeFood}
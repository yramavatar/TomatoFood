import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
 

// app config - initialising the app config using express packages.

const app = express()
 const port = 4000;

 // middleware  using app.use 
 app.use(express.json())         // when request from frontend it will passed by this express.json 

 app.use(cors())      // using this we can access backend from any frontend pages / component

 // db connection
   connectDB();

   // api end points for url fetching

   app.use("/api/food",foodRouter)
   app.use("/images", express.static('uploads'))
   app.use("/api/user",userRouter);
   app.use("/api/cart",cartRouter);
   app.use("/api/order",orderRouter)



   app.get("/",(req,res)=>{
    res.send("API Working")    // to fetch the data from the server by hittng / will get msg api working 

            })                        
 app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)   // this will fetch the exact calling method 
 })


  
 


 
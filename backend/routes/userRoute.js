import express from "express"
import { loginUser,registerUser } from "../controllers/userController.js"

// creating router using express router

 const userRouter = express.Router();

 // creating router for api call url
 userRouter.post("/register",registerUser)
 userRouter.post("/login",loginUser)


 export default userRouter;

 

import exprees from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

// creating express router

const cartRouter = exprees.Router(); // by using these we can create multiple end points

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;


import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js'


// creating router for placinh

const orderRouter = express.Router();

// using this creating multple endpoints

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders);
orderRouter.post("/status",updateStatus)

export default orderRouter;


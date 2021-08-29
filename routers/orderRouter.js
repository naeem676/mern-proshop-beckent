import express from 'express';
import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddle.js'

const router = express.Router();


router.post('/order', protect, asynchandler(async(req, res)=>{
 
   const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice  } = req.body;

   if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      
   } else {
       const order = new Order({
           user:req.user._id,
        orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
       })
       const createOrder = await order.save()
       res.status(201).json(createOrder)
   }
    
}))


export default router;
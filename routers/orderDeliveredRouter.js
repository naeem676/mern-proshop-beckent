import express from 'express';
import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddle.js'

const router = express.Router();


router.put('/order/delivered/:id', protect,  asynchandler(async(req, res)=>{
  
   const order = await Order.findById(req.params.id)
    if(order){
       order.isDelivered = true;
       order.deliveredAlt = Date.now();
       const deliveredOrder = await order.save()
       res.json(deliveredOrder);
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

}))


export default router;
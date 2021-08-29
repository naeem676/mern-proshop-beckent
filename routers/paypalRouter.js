import express from 'express';
import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddle.js'

const router = express.Router();


router.put('/findOrder/:id/pay', protect,  asynchandler(async(req, res)=>{
  
   const order = await Order.findById(req.params.id)
    if(order){
       order.isPaid = true;
       order.paidAlt = Date.now();
       order.paymentResult = {
           id:req.body.id,
           status:req.body.status,
           update_time:req.body.update_time,
           email_address:req.body.payer.email_address,

       }
       const updateOrder = await order.save()
       res.json(updateOrder);
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

}))


export default router;
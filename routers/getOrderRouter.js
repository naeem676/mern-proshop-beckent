import express from 'express';
import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddle.js'

const router = express.Router();


router.get('/findOrder/:id', protect,  asynchandler(async(req, res)=>{
  
   const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(order){
       res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

}))


export default router;
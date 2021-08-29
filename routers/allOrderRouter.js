import express from 'express';
import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddle.js'

const router = express.Router();


router.get('/orderList', protect,  asynchandler(async(req, res)=>{
  
   const orders = await Order.find({}).populate('user', 'id name');
    
       res.json(orders)

}))


export default router;
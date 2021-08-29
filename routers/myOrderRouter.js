import express from 'express';
import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect } from '../middleware/authMiddle.js'

const router = express.Router();


router.get('/order/myOrder', protect, asynchandler(async(req, res)=>{
    const order = await Order.find({user:req.user._id})
    res.json(order)
    
}))


export default router;
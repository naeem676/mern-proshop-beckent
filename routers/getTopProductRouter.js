import express from 'express';
import Product from '../models/productModel.js';
import asynchandler from 'express-async-handler';

const router = express.Router();

//@desc fatch top rating  products
//@route GET/api/top
//@access public
router.get('/top', asynchandler(async(req, res)=>{
   const products = await Product.find({}).sort({ rating: -1}).limit(3)
   res.json(products)
}))

export default router;
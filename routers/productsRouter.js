import express from 'express';
import Product from '../models/productModel.js';
import asynchandler from 'express-async-handler';

const router = express.Router();

//@desc fatch all products
//@route GET/api/products
//@access public
router.get('/', asynchandler(async(req, res)=>{
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options: 'i'
        }
    } : {};
    const products = await Product.find({...keyword})
   
        res.status(200).json(products)
    
   
    
}))

//@desc fatch single products
//@route GET/api/products/:id
//@access public
router.get('/:id', asynchandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)
        res.status(200).json(product)
       
    
}))

export default router;
import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.post('/create/product', protect, admin, asyncHandler(async(req, res)=>{
    const product = new Product({
        name:'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReview:0,
        description:'sample description'
    })

    const createProduct = await product.save();
    res.status(201).json(createProduct)
  
   
}))

export default  router ;
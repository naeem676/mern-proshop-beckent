import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.delete('/product/delete/:id', protect, admin, asyncHandler(async(req, res)=>{
  const product =  await Product.findById(req.params.id)
  if(product){
      await product.remove()
      res.json({message:'Product removed'})
  } else {
   res.status(404)   
   throw new Error('Product not found')
  }
 
   
}))

export default  router ;
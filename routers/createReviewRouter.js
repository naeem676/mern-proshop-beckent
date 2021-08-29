import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.post('/review/:id', protect, asyncHandler(async(req, res)=>{
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id)

  if(product){
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString() )
      if(alreadyReviewed){
          res.status(401)
          throw new Error('Product already Reviewed')
      }

      
      const review = {
          name:req.user.name,
          rating:Number(rating),
          comment,
          user:req.user._id

      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating = product.reviews.reduce((acc, item)=> item.rating + acc, 0) / product.reviews.length;
      await product.save()
      res.status(201).json({message:'review added'})


  }else{
        res.status(404)
        throw new Error('Product not found')
    }
  
   
}))

export default  router ;
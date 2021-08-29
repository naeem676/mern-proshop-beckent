import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.put('/update/product/:id', protect, admin, asyncHandler(async(req, res)=>{
    const {name, price, description, image, brand, category, countInStock  } = req.body;

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updateProduct = await product.save();
        res.json(updateProduct)

    }else{
        res.status(404)
        throw new Error('Product not found')
    }


  
  
   
}))

export default  router ;
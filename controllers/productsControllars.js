// import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler';

// //@desc fatch all products
// //@route GET/api/products
// //@access public

// const pickProducts = asyncHandler(async(req, res) =>{
//     const products = await Product.find({})
   
//         res.status(200).json(products)
// })

// //@desc fatch single products
// //@route GET/api/products/:id
// //@access public

// const pickProductById = asyncHandler(async(req, res) =>{
//     const product = await Product.findById(req.params.id)
//         res.status(200).json(product)
// })

// export { pickProducts, pickProductById };
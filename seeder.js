import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './db.js';

dotenv.config();

connectDB();

const importData = async () =>{
    try {
        const  createUsers = await User.insertMany(users) 
        const adminUser = createUsers[0]._id
        const sampleProducts = products.map( product =>{
            return {...product, user:adminUser}
        })
        await Product.insertMany(sampleProducts);
        console.log('data import!'.green.inverse)
        process.exit()
        
    } catch (error) {
        console.log(`${error.message}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async () =>{
    try {
        await  Order.deleteMany();
        await  Product.deleteMany();
        await  User.deleteMany();
        console.log('data destroy!'.red.inverse)
        process.exit()
        
    } catch (error) {
        console.log(`${error.message}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}
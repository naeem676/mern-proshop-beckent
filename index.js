import path from 'path';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import {
     notFound, 
     errorHandle 
    } from './middleware/errorMiddleware.js'
import productsRouter from './routers/productsRouter.js';
import createProductRouter from './routers/createProductRouter.js';
import updateProductRouter from './routers/updateProductRouter.js';
import productDeleteRouter from './routers/productDeleteRouter.js';
import userRouter from './routers/userRoutes.js';
import profileRouter from './routers/profilRouter.js';
import registerRouter from './routers/registerRouter.js';
import profileUpdate from './routers/profileUpdate.js';
import orderRouter from './routers/orderRouter.js';
import allOrderRouter from './routers/allOrderRouter.js';
import getOrderRouter from './routers/getOrderRouter.js';
import paypalRouter from './routers/paypalRouter.js';
import myOrder from './routers/myOrderRouter.js';
import usersRouter from './routers/getUsersRouter.js';
import userDeleteRouter from './routers/userDeleteRouter.js';
import userDetailsRouter from './routers/userDetailsRouter.js';
import uploadsRouter from './routers/uploadsRouter.js';
import getTopProductRouter from './routers/getTopProductRouter.js';
import createReviewRouter from './routers/createReviewRouter.js';
import orderDeliveredRouter from 
'./routers/orderDeliveredRouter.js';
import updateUserByAdmin from './routers/updateUserByAdmin.js';
import bodyParser from 'body-parser'
dotenv.config()

const  app = express();


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.use(bodyParser.json())
app.use(express.json())

connectDB();

app.use('/api', createReviewRouter)
app.use('/api/upload', uploadsRouter)
app.use('/api/products', productsRouter)
app.use('/api', productDeleteRouter)
app.use('/api', createProductRouter)
app.use('/api', updateProductRouter)
app.use('/api', getTopProductRouter)
app.use('/api/user', userRouter)
app.use('/api', profileRouter)
app.use('/api', registerRouter)
app.use('/api', profileUpdate)
app.use('/api', orderRouter)
app.use('/api', orderDeliveredRouter)
app.use('/api', allOrderRouter)
app.use('/api', getOrderRouter)
app.use('/api', paypalRouter)
app.use('/api', myOrder)
app.use('/api', usersRouter)
app.use('/api', userDeleteRouter)
app.use('/api', userDetailsRouter)
app.use('/api', updateUserByAdmin)
app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 
    '/uploads')))

app.use(notFound)
app.use(errorHandle)
app.use(cors())










app.get('/', (req, res)=>{
    res.send('hello world')
})


app.listen(process.env.PORT || 5000)


import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utilis/jwtToken.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.post('/user', asyncHandler(async(req, res)=>{
    const {name, email, password } = req.body;
    const existUser = await User.findOne({ email })
    if(existUser){
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    } else{
        res.status(404)
        throw new Error('User not found')
    }

     
    
   
}))

export default  router ;
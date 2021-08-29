import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utilis/jwtToken.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.post('/login', asyncHandler(async(req, res)=>{
    const { email, password } = req.body;
    
    const user = await User.findOne({ email })
    if(user && (await user.matchPassword(password)) ){
         res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)

        })
        
        
    } else {
        res.status(401)
        throw new Error('email or password dont match')
    }
    
   
}))

export default  router ;

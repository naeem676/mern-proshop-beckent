import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utilis/jwtToken.js';
import { protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.put('/update', protect, asyncHandler(async(req, res)=>{
  const user =  await User.findById(req.user._id)
  if(user){
   user.name = req.body.name || user.name;
   user.email= req.body.email || user.email;
   if(req.body.password){
       user.password = req.body.password;
    
   }
   const updateUser = await user.save();
       res.json({
           _id:updateUser._id,
           name:updateUser.name,
           email:updateUser.email,
           isAdmin:updateUser.isAdmin,
           token:generateToken(updateUser._id),
       })
  } else {
      res.status(401)
      throw new Error('User not found')
  }
   
}))

export default  router ;
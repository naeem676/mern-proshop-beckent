import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.get('/profile', protect, asyncHandler(async(req, res)=>{
  const user =  await User.findById(req.user._id)
  if(user){
    res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
    })
  } else {
      res.status(401)
      throw new Error('No user')
  }
   
}))

export default  router ;
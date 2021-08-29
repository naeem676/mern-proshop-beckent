import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.delete('/user/delete/:id', protect, admin, asyncHandler(async(req, res)=>{
  const user =  await User.findById(req.params.id)
  if(user){
      await user.remove()
      res.json({message:'User removed'})
  } else {
   res.status(404)   
   throw new Error('User not found')
  }
 
   
}))

export default  router ;
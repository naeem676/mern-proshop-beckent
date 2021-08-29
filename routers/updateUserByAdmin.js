import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.put('/update/admin/:id', protect, asyncHandler(async(req, res)=>{
  const user =  await User.findById(req.params.id)
  if(user){
   user.name = req.body.name || user.name;
   user.email= req.body.email || user.email;
   user.isAdmin = req.body.isAdmin || user.isAdmin;
   const updateUser = await user.save();
       res.json({
           _id:updateUser._id,
           name:updateUser.name,
           email:updateUser.email,
           isAdmin:updateUser.isAdmin,
       })
  } else {
      res.status(401)
      throw new Error('User not found')
  }
   
}))

export default  router ;
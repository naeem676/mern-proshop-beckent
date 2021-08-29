import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/authMiddle.js';

const router = express.Router();

const app = express();

app.use(express.json())


router.get('/users', protect, admin, asyncHandler(async(req, res)=>{
  const users =  await User.find({})
  res.json(users)
 
   
}))

export default  router ;
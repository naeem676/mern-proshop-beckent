import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:false,
    },
    

},{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enterPassword){
    return (
        await bcryptjs.compare(enterPassword, this.password))
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt)


})

const User = mongoose.model('User', userSchema );
export default User;
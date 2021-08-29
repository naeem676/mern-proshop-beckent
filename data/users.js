import bcrypt from 'bcryptjs';

const users =[{
    name:'Admin User',
    email:'admin@example',
    password:bcrypt.hashSync('123456', 10),
    isAdmin:true,
},
{
    name:'Naeem Uddin',
    email:'naeem@example',
    password:bcrypt.hashSync('123456', 10),
    
},
{
    name:'Rahat Raihan',
    email:'rahat@example',
    password:bcrypt.hashSync('123456', 10),
    
}]

export default users;
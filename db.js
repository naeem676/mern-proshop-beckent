import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true,
        })
        if(conn.connection){
            console.log(`mongodb ${conn.connection.host}`.cyan.underline)
            
        }
    } catch(error) {
         console.error(`Error: ${error.message}`.red.underline)
        
    }
}

export default connectDB;
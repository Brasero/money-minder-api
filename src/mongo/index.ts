import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({
    path: [
        '.env.sample',
        '.env'
    ]
});

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connected to mongodb'))

export default mongoose;
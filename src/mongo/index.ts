import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config({
    path: [
        '.env.sample',
        '.env'
    ]
});

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connected to mongodb'),(reason) => console.log('Failed to acces DB' + reason))

export default mongoose;
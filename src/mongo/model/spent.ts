import mongo from '../index'
import {Types} from "mongoose";

 export interface ISpent {
    _id: Types.ObjectId;
     userId: number;
    description: string;
    amount: number;
}

 export const spentSchema = new mongo.Schema<ISpent>({
     userId:{
         type: Number,
         require: true
     },
    description: String,
    amount: Number
})

export default mongo.model('Spent', spentSchema)
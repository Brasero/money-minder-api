// @ts-ignore
import mongo from '../index.ts'
import {Types} from "mongoose";

export interface IIncome {
    _id : Types.ObjectId;
    userId: number;
    amount: number;
    origin: string;
}

 export const incomeSchema = new mongo.Schema<IIncome>({
    userId: {
        type: Number,
        require: true
    },
    amount: Number,
    origin: String
})

export default mongo.model('Income', incomeSchema)
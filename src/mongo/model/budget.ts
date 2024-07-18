import mongo from '../index'
import {budgetItemSchema, IBudgetItem} from "./budgetItem";
import {IIncome, incomeSchema} from "./Income";
import {Model, Document, Types} from "mongoose";



export interface IBudget extends Document {
    _id: Types.ObjectId;
    userId: number;
    name: string;
    budgetItems: IBudgetItem[];
    incomeItems: IIncome[];
}
type THydratedBudgetDocument = {
    _id: Types.ObjectId;
    userId: number;
    name: string;
    budgetItems?: Types.DocumentArray<IBudgetItem>;
    incomeItems?: Types.DocumentArray<IIncome>;
} & Document
type BudgetModelType = Model<IBudget, {}, {}, {}, THydratedBudgetDocument>
const budgetSchema = new mongo.Schema<IBudget,BudgetModelType>({
    userId:{
        type: Number,
        require: true
    },
    name: String,
    budgetItems:[
        budgetItemSchema
    ],
    incomeItems:[
        incomeSchema
    ]
})

export default mongo.model<IBudget,BudgetModelType>('Budget', budgetSchema)
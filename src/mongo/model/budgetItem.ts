import mongo from '../index'
import {spentSchema, ISpent} from "./spent";
import {Types, Model, Document} from "mongoose";

export interface IBudgetItem extends Document {
    _id: Types.ObjectId;
    name: string;
    amount: number;
    spentItems: ISpent[];
}
type THydratedBudgetDocument = {
    name: string;
    amount: number;
    spentItems?: Types.DocumentArray<ISpent>;
} & Document
type BudgetItemType = Model<IBudgetItem, {}, {}, {}, THydratedBudgetDocument>
export const budgetItemSchema = new mongo.Schema<IBudgetItem, BudgetItemType>({
    name: String,
    amount: Number,
    spentItems: [
        spentSchema
    ]
})

export default mongo.model<IBudgetItem, BudgetItemType>('BudgetItem', budgetItemSchema)
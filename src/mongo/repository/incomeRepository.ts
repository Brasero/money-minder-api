import Income from '../model/Income'
import {Types} from "mongoose";

export function createIncome(amount: number, origin: string, userId: any){
    try{
        const doc = new Income({amount,origin,userId});
        return doc.save().then((income) => {
            if(income){
                return income
            }
            return false
        })
    } catch(reason){
        return reason
    }
}

export async function deleteIncomeById(id: Types.ObjectId | string){
    try{
        return Income.deleteOne({_id:id}).then(() => {
            return true
        }, () => {
            return false
        })
    } catch(e) {
        console.log(e)
        return false
    }
}
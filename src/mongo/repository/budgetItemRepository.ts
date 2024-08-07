import BudgetItem from "../model/budgetItem";
import {Types} from "mongoose";
export function createBudgetItem(name: string, amount: number){
    try{
        const doc = new BudgetItem({name,amount});
        return doc.save().then((budgetItem) => {
            if(budgetItem){
                return budgetItem
            }
            return false
        })
    }catch (reason){
        return reason
    }
}

export function findBudgetItemById(id: any){
    try{
        return BudgetItem.findById(id).then(
            (doc) => {
                if(doc){
                    return doc
                }
                return false;
            },
            (reason) => {
                console.log(reason)
                return false
            })
    } catch (reason) {
        console.log(reason)
        return false;
    }
}

export async function updateBudgetItemById(id, update){
    try{
        return BudgetItem.findByIdAndUpdate(id, {...update}).then((doc) => {
            if(doc) {
                return doc
            }
            return false
        }, (reason) => {
            console.log(reason)
            return false
        })
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function addSpentToBudgetItemById(id: Types.ObjectId | string, spent){
    try{
        const budgetItem = await BudgetItem.findById(id).exec()
        if(budgetItem){
            budgetItem.spentItems.push(spent)
            await budgetItem.save()
            return true
        }
        return false
    }catch(reason){
        console.log(reason)
        return false
    }
}

export async function deleteBudgetItemById(id: Types.ObjectId | string){
    try {
        return BudgetItem.deleteOne({_id:id}).then(() => {
            return true
        }, () => {
            return false
        })
    }catch (e){
        console.log(e)
        return false
    }
}
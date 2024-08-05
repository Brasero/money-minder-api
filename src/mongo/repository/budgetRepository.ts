import Budget from "../model/budget";
import {Types} from "mongoose";

export function createBudget(name: string, userId: any){
    try{
        const doc = new Budget({name, userId});
        return doc.save().then((budget) => {
            if(budget){
                return budget
            }
            return false
        })
    }catch (reason){
        return reason
    }
}

export function findBudgetById(id: any) {
    try {
        return Budget.findById(id).then(
        (doc) => {
            if (doc) {
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

export async function findBudgetByUserID(userID: any) {
    try {
        return Budget.find({userId: userID}).then((budget) => {
            if (budget && budget.length) {
                return budget
            }
            return false
        }, () => {
            return false
        })
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function updateBudgetById(id, update) {
    try {
        return Budget.findByIdAndUpdate(id, {...update}).then((doc) => {
            if (doc) {
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

export async function deleteBudgetById(id: Types.ObjectId | string) {
    try {
        return Budget.deleteOne({_id: id}).then(() => {
            return true
        }, () => {
            return false
        })
    } catch(e) {
        console.log(e)
        return false
    }
}

export async function addIncomeToBudgetById(id: Types.ObjectId | string, income){
    try{
        const budget = await Budget.findById(id).exec()
        if(budget){
             budget.incomeItems.push(income)
             await budget.save()
             return true
        }
        return false
    }catch(reason){
        console.log(reason)
        return false
    }
}
export async function addBudgetItemToBudgetById(id: Types.ObjectId | string, budgetItem){
    try {
        const budget = await Budget.findById(id).exec()
        if(budget){
            budget.budgetItems.push(budgetItem)
            await budget.save()
            return true
        }
        return false
    } catch (reason){
        console.log(reason)
        return false
    }
}

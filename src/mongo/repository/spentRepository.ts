import Spent from "../model/spent";
import {Types} from "mongoose";

export function createSpent(description: string, amount: number, userId: any){
    try{
        const doc = new Spent({description,amount,userId});
        return doc.save().then((spent) => {
            if(spent){
                return spent
            }
            return false
        })
    }catch (reason){
        return reason
    }
}

export function findSpentById(id: any){
    try{
        return Spent.findById(id).then(
            (doc) => {
                if(doc){
                    return doc
                }
                return false;
            },
            (reason) => {
                console.log(reason)
                return false
            }
        )
    }catch (reason){
        console.log(reason)
        return false;
    }
}

export async function deleteSpentById(id: Types.ObjectId | string){
    try{
        return Spent.deleteOne({_id: id}).then(() => {
            return true
        }, () => {
            return false
        })
    }catch (e) {
        console.log(e)
        return false
    }
}
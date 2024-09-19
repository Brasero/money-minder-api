import {createBudget} from "../mongo/repository/budgetRepository";
import {Response,Request} from "express";
export async function addBudget(req: Request,res:Response){
    const {name} = req.body
    if(!name){
        return res.status(403).send({success: false, message:"No data to process"})
    }
    const budgetCreate = await createBudget(name,req.user.id);
    if(budgetCreate !== null){
        return res.send({success: true, message: "Add new budget"})
    } else {
        return res.send({success: false, message: "Not add new budget"})
    }
}
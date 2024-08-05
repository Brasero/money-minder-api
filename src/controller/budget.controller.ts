import {createBudget} from "../mongo/repository/budgetRepository";

export async function addBudget(req,res){
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
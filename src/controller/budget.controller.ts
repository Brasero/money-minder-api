import {createBudget} from "../mongo/repository/budgetRepository";
import {Response,Request} from "express";
import {IRequestWithUser} from "../route/middleware/jwtMiddleware";
export async function addBudget(req: Request,res:Response){
    const {name} = req.body
    if(!name){
        return res.status(403).send({success: false, message:"No data to process"})
    }
    const budgetCreate = await createBudget(name,(req as IRequestWithUser).user.id);
    if(budgetCreate !== null){
        return res.send({success: true, message: "Budget created"})
    } else {
        return res.send({success: false, message: "Budget not created"})
    }
}
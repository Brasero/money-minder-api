import {createUserIfNotExist} from "../sequelize/repository/userRepository";
import {Response,Request} from "express";
import bcrypt from "bcryptjs"

export async function createUser(req:Request,res:Response){
    const {nom, prenom, pseudo, mail, mdp, brithday} = req.body
    if(!nom || !prenom || !pseudo || !mail || !mdp || !brithday){
        return res.status(403).send({success:false, message:"No data to process"})
    }else {
        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(mdp,salt)
        const UserCreate = await  createUserIfNotExist({nom,prenom,pseudo,mail,mdp:hash,brithday,code_validation:null})
        if(typeof UserCreate !== "boolean" && typeof UserCreate !== "string"){
            return res.send({success: true, message: "User created"})
        }else {
            return res.send({success: false, message: "User not created"})
        }
    }
}
import {createUserIfNotExist, findUserByEmail} from "../sequelize/repository/userRepository";
import {Response,Request} from "express";
import bcrypt from "bcryptjs";
import {createTokens} from "../service/jwt";

export async function createUser(req:Request,res:Response){
    const {nom, prenom, pseudo, mail, mdp, birthday} = req.body
    if(!nom || !prenom || !pseudo || !mail || !mdp || !birthday){
        return res.status(403).send({success:false, message:"No data to process"})
    }else {
        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(mdp,salt)
        const UserCreate = await  createUserIfNotExist({nom,prenom,pseudo,mail,mdp:hash,birthday,code_validation:null})
        if(typeof UserCreate !== "boolean" && typeof UserCreate !== "string"){
            return res.send({success: true, message: "User created"})
        }else {
            return res.send({success: false, message: "User not created"})
        }
    }
}

export async function connectUser(req: Request, res: Response) {
    const { mail, mdp } = req.body
    if (!mail || !mdp) return res.status(403).send({success: false, message: "Please provide all the required fields"})
    const user = await findUserByEmail(mail)
    if (typeof user === "string") return res.status(404).send(user) //L'utilisateur n'existe pas ou une erreur s'est produite
    bcrypt.compare(mdp, user.mdp, (err, result) => {
        if (!result) return res.status(404).send("Wrong password")
        if (err) return res.status(500).send('An error occurred while connecting user, please try again later.')
        const tokens = createTokens({id: user.id, name: user.nom})
        res.header("Authorization", `Bearer ${tokens.token}`)
        return res.status(200).send(tokens.refreshToken)
    })
}
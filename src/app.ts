import express, {Application, Request, Response} from "express";
import db, {IDb} from "./sequelize/models/index.js";
import session from 'express-session';
import mongoStore from 'connect-mongo';
// @ts-ignore
import Income from "./mongo/model/Income.ts";

const app: Application & {db?: IDb} = express()
app.db = db;

const {SESSION_NAME, SESSION_SECRET, MONGODB_SESSION_URL} = process.env

console.log(MONGODB_SESSION_URL)

app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: mongoStore.create({mongoUrl: MONGODB_SESSION_URL})
}))
app.use(express.raw())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', async (req: Request, res: Response): Promise<Response> => {
    const docs = await Income.find()
    return res.send({message: 'home page'})
})


export default app;
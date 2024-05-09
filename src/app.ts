import express, {Application, Request, Response} from "express";
import db, {IDb} from "./models/index.js";

const app: Application & {db?: IDb} = express()
app.db = db;

app.use(express.raw())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req: Request, res: Response): Response => {
    return res.send('Hello update test')
})


export default app;
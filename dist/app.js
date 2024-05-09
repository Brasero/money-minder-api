import express from "express";
import db from "./models/index.js";
const app = express();
app.db = db;
app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    return res.send('Hello world');
});
export default app;

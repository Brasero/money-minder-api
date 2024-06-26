import express from "express";
import db from "./models/index.js";
import session from 'express-session';
// import mongoStore from 'connect-mongo';
const app = express();
app.db = db;
const { SESSION_NAME, SESSION_SECRET, MONGODB_SESSION_URL } = process.env;
console.log(MONGODB_SESSION_URL);
app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    return res.send('Hello update');
});
export default app;

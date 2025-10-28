import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config"

const app = express();

import authrouter from "./controller/auth.js";
// Middleware

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use("/auth", authrouter);
const connect = ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("🔒Connection to Database Establised");
    } catch (error) {
        console.log("🚨Failed to connect to Database🚨");
    }
}

app.get("/", (req, res)=>{
    res.render("index")
})

//server startup

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})
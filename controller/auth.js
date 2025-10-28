import express from "express";
import users from "../models/users.js";
import bcrypt from "bcrypt"
import isSignedOut from "../middleware/is_signed_out.js";
import isSignedIn from "../middleware/is_signed_in.js";
const router = express.Router();

router.get("/sign-in",isSignedOut, async (req, res)=>{
    try {
        res.render("auth/sign-in");
    } catch (error) {
        
    }
});
router.post("/sign-in", (req, res)=>{
    try {
        console.log(req.body)
    } catch (error) {
        
    }
});
router.get("/sign-up", isSignedOut, (req, res)=>{
    try {
        res.render("auth/sign-up");
    } catch (error) {
        
    }
});
router.post("/sign-up", (req, res)=>{
    try {
        const email = req.body.email;
        const password =  req.body.password;
        const username =  req.body.password;
        if(users.findOne({email: email})) res.status(409).send("Email has already been used");
        if(users.findOne({username: username})) res.status(409).send("Username is Already Taken");
        if(password !== req.body["confirm-password"]) res.status(409).send("Passwords do not match");

        req.body.password = bcrypt.hash(password, 12);
        users.create(req.body)
        console.log(req.body)
    } catch (error) {
        
    }
});

router.post("/sign-out", isSignedIn, (req, res)=>{

});
export default router
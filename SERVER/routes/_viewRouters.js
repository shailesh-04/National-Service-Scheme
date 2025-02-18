import { Router } from "express";
import {catchErr} from '#color';
const router = Router();
try {
    router.get("/users",(req,res)=>{
        res.render('users');
    });
    router.get("/signup",(req,res)=>{
        res.render('signup');
    });
    router.get("/signin",(req,res)=>{
        res.render('signin');
    });
    router.get("/event",(req,res)=>{
        res.render("Event");
    });
    router.get("/emages",(req,res)=>{
        res.render("images");
    });
} catch (error) {
    catchErr(error,"ViewRoute");
}
    
export default router;
import { Router } from "express";
import {catchErr} from '#color';
const router = Router();
try {
    router.use("/curd",(req,res)=>{
        res.render('curd');
    });
    router.use("/signup",(req,res)=>{
        res.render('signup');
    });
    router.use("/signin",(req,res)=>{
        res.render('signin');
    });
} catch (error) {
    catchErr(error,"ViewRoute");
}
    
export default router;
import { Router } from "express";
const router = Router();
(()=>{
    router.use("/signup",(req,res)=>{
        res.render('signup');
    });
    router.use("/signin",(req,res)=>{
        res.render('signin');
    });
})();
export default router;
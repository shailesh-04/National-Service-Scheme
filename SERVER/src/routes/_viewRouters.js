import { Router } from "express";
import {catchErr} from '#color';
import { viewAuthenticate } from "#middleware/auth.middleware.js";
const router = Router();
try {
    router.get("/users",viewAuthenticate,(req,res)=>{
        res.render('users');
    });
    router.get('/', async (req, res) => {
        try {
            const user = req.auth || null;
             res.render('index', { user });
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                return res.status(500).send("Internal Server Error");
            }
        }
    });
    
    router.get("/event",viewAuthenticate,(req,res)=>{
        res.render("Event");
    });
    router.get("/emages",viewAuthenticate,(req,res)=>{
        res.render("images");
    });
} catch (error) {
    catchErr(error,"ViewRoute");
}
    
export default router;
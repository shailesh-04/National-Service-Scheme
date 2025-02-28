import { Router } from "express";
import user from  "./users.route.js";
import event from "./events.route.js";
import emages from "./emages.route.js";
import {catchErr} from "#color";
const router = Router();
try {
    router.use("/user",user);
    router.use("/event",event);
    router.use("/images",emages);
    
} catch (error) {
    catchErr(error,"_routes");
}
export default router;
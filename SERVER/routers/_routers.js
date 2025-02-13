import { Router } from "express";
import user from  "./users.route.js";
import {catchErr} from "#color";
const router = Router();
try {
    router.use("/user",user);
} catch (error) {
    catchErr(error,"_routers");
}
export default router;
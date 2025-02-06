import { Router } from "express";
const router = Router();
import user from  "./users.route.js";
(()=>{
    router.use("/user",user);
})();
export default router;
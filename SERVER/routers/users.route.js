import { Router } from "express";
import { signup ,findAll, singin} from "#controllers/users.contraller.js";
const router = Router();
(() => {
    router.post("/signup", signup);
    router.post("/singin", singin);
    router.get("/", findAll);
})();
export default router;

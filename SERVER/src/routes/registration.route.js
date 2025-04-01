import Router from "express";
import RegistratoinController from "#controllers/registration.controller.js";
import { catchErr } from "#color";
const router = Router();
try {
    router.post("/check", RegistratoinController.check);
    router.post("/", RegistratoinController.create);
    router.get("/", RegistratoinController.getAll);
    router.get("/inEventfindUsers/:id",RegistratoinController.inEventfindUsers);
    router.put("/:id", RegistratoinController.changeStatus);
} catch (error) {
    catchErr(error, "event.routers");
}
export default router;

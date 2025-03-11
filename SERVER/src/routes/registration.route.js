import Router from "express";
import RegistratoinController from "#controllers/registration.controller.js";

const router = Router();
router.post("/check", RegistratoinController.check);
router.post("/", RegistratoinController.create);

    router.get("/", RegistratoinController.getAll);
    router.get("/inEventfindUsers/:id", RegistratoinController.inEventfindUsers);
    router.put("/:id", RegistratoinController.changeStatus);

export default router;

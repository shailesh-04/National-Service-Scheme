import NSSStoreController from "#controllers/nss_store.controller.js";
import { Router } from "express";
import { catchErr } from "#color";
const router = Router();
try {
    router.get("/", NSSStoreController.getAll);
    router.get("/:id", NSSStoreController.getById);
    router.post("/", NSSStoreController.create);
    router.put("/:id", NSSStoreController.update);
    router.delete("/:id", NSSStoreController.delete);
} catch (error) {
    catchErr(error, "nssStore.route");
}
export default router;

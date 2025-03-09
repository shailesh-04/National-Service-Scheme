import { Router } from "express";
import { catchErr } from "#color";
import cloudinary from "#middleware/cloudinary.middleware.js";
import {
    create,
    update,
    remove,
    findAll,
    findOne,
    upcoming,
    uploadImage,
    All,
    AllUpdate,
    restore,
    createFull
} from "#controllers/events.controller.js";
const router = Router();
try {
    router.get("/dashbord",All);
    router.post("/dashbord",cloudinary.upload.single("image"),createFull);
    router.put("/dashbord/:id",cloudinary.upload.single("image"),AllUpdate);
    router.get("/", findAll);
    router.post("/", create);
    router.get("/upcoming", upcoming);
    router.get("/restore/:id", restore);
    router.put("/image/:id", cloudinary.upload.single("image"), uploadImage);
    router.route("/:id").get(findOne).put(update).delete(remove);
} catch (error) {
    catchErr(error, "event.routers");
}
export default router;

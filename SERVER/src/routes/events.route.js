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
} from "#controllers/events.controller.js";
const router = Router();
try {
    router.get("/dashbord",All);
    router.put("/dashbord/:id",AllUpdate);
    
    router.get("/", findAll);
    router.post("/", create);
    router.get("/upcoming", upcoming);
    router.put("/image/:id", cloudinary.upload.single("image"), uploadImage);
    router.route("/:id").get(findOne).put(update).delete(remove);
} catch (error) {
    catchErr(error, "event.routers");
}
export default router;

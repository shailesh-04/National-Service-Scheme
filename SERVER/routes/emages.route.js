import { Router } from "express";
import { catchErr } from "#color";
import cloudinary from "#middleware/cloudinary.middleware.js";
import { uploadImages, findAll,eventEmages } from "#controllers/images.controller.js";
const router = Router();
try {
    router.post("/", cloudinary.upload.array("images", 10), uploadImages);
    router.get("/", findAll);
    router.get("/event", eventEmages);

} catch (error) {
    catchErr(error, "images.route");
}
export default router;

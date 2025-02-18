import { Router } from "express";
import { catchErr } from "#color";
import { upload} from "#middleware/cloudinary.middleware.js";
import {
    uploadImages,
    findAll
} from "#controllers/images.controller.js";
const router = Router();
try {
    router.post("/",upload.array("images",10),uploadImages);
    router.get("/", findAll);
} catch (error) {
    catchErr(error,'Event.route');
}
export default router;

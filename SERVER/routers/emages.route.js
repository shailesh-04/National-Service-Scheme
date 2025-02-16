import { Router } from "express";
import { catchErr } from "#color";
import { EventImages } from "#middleware/Cloudinary.middleware.js";
import {
    upload,
    findAll
} from "#controllers/images.controller.js";
const router = Router();
try {
    router.post("/",EventImages,upload);
    router.get("/", findAll);
} catch (error) {
    catchErr(error,'user.route');
}
export default router;

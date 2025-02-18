import { Router } from "express";
import { catchErr } from "#color";
import { multipleUpload} from "#middleware/cloudinary.middleware.js";
import {
    upload,
    findAll
} from "#controllers/images.controller.js";
const router = Router();
try {
    router.post("/",multipleUpload,upload);
    router.get("/", findAll);
} catch (error) {
    catchErr(error,'Event.route');
}
export default router;

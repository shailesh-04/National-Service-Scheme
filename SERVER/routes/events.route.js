import { Router } from "express";
import { catchErr } from "#color";
import { upload } from "#middleware/cloudinary.middleware.js";
import {
    create,
    update,
    remove,
    findAll,
    findOne,
    upcoming,
    uploadImage
} from "#controllers/events.controller.js";
const router = Router();
try {
    router.get("/",findAll);
    router.post("/",upload.single("image"),create);
    router.get("/upcoming",upcoming);
    router.put("/image/:id",upload.single('image'),uploadImage);
    router.route("/:id").get(findOne).put(update).delete(remove);
    

} catch (error) {
    catchErr(error,'Eent.route');
}
export default router;

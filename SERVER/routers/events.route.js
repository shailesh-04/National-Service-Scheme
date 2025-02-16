import { Router } from "express";
import { catchErr } from "#color";
import { EventImage } from "#middleware/Cloudinary.middleware.js";
import {
    create,
    update,
    remove,
    findAll,
    findOne
} from "#controllers/events.controller.js";
const router = Router();
try {
    router.get("/",findAll);
    router.post("/",EventImage.single("image"),create);
    router.route("/:id").get(findOne).put(update).delete(remove);

} catch (error) {
    catchErr(error,'user.route');
}
export default router;

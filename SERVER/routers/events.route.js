import { Router } from "express";
import { catchErr } from "#color";
import { singleUpload } from "#middleware/cloudinary.middleware.js";
import {
    create,
    update,
    remove,
    findAll,
    findOne,
    upcoming
} from "#controllers/events.controller.js";
const router = Router();
try {
    router.get("/",findAll);
    router.post("/",singleUpload,create);
    router.get("/upcoming",upcoming);

    router.route("/:id").get(findOne).put(update).delete(remove);
    

} catch (error) {
    catchErr(error,'Eent.route');
}
export default router;

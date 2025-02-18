import { Router } from "express";
import { catchErr } from "#color";
import {
    signup,
    findAll,
    singin,
    update,
    findOne,
    remove,
    uploadImage
} from "#controllers/users.contraller.js";
import { upload } from "#middleware/cloudinary.middleware.js";
const router = Router();
try {
    router.post("/signup", signup);
    router.post("/singin", singin);
    router.get("/", findAll);
    router.post("/", signup);
    router.put('/image/:id',upload.single("image"),uploadImage);
    router.route("/:id").get(findOne).put(update).delete(remove);
} catch (error) {
    catchErr(error, "user.route");
}
export default router;

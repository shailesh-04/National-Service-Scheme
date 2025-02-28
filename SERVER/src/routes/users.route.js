    import { Router } from "express";
import { catchErr } from "#color";
import {
    signup,
    findAll,
    singin,
    update,
    findOne,
    remove,
    uploadImage,
    getEventUser,
    All,
    updateAll
} from "#controllers/users.contraller.js";
import  cloudinary from "#middleware/cloudinary.middleware.js";
import { authenticate } from "#middleware/auth.middleware.js";
const router = Router();
try {
    // DashBord
    router.get("/dashbord",authenticate, All);
    router.put("/dashbord/:id",updateAll);
    // User
    router.get("/", findAll);
    router.post("/signup", signup);
    router.post("/singin", singin);
    router.post("/", signup);
    router.put('/image/:id',cloudinary.upload.single('image'),uploadImage);
    router.get("/event/:id", getEventUser);
    router.route("/:id").get(findOne).put(update).delete(remove);
} catch (error) {
    catchErr(error, "user.route");
}
export default router;

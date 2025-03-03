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
    updateAll,
    verifyUser
} from "#controllers/users.contraller.js";
import  cloudinary from "#middleware/cloudinary.middleware.js";
import { authenticate } from "#middleware/auth.middleware.js";
const router = Router();
try {
    router.get("/dashbord",authenticate, All);
    router.put("/dashbord/:id",updateAll);
    router.get("/", findAll);
    router.post("/signup", signup);
    router.post("/singin", singin);
    router.get("/singin",authenticate,verifyUser);
    router.post("/", signup);
    router.put('/image/:id',cloudinary.upload.single('image'),uploadImage);
    router.get("/event/:id", getEventUser);
    router.route("/:id").get(findOne).put(update).delete(remove);
} catch (error) {
    catchErr(error, "user.route");
}
export default router;

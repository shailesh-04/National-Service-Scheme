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
    verifyUser,
    newUser,
    profile,
    sendOtp
} from "#controllers/users.contraller.js";
import  cloudinary from "#middleware/cloudinary.middleware.js";
import { authenticate,viewAuthenticate } from "#middleware/auth.middleware.js";
const router = Router();
try {
    router.get("/dashbord", All);
    router.put("/dashbord/:id",updateAll);
    router.post("/dashbord", newUser);
    router.get("/getProfile",viewAuthenticate, profile);

    router.get("/", findAll);
    router.post("/signup", signup);
    router.post("/sendOTP", sendOtp);
    router.post("/singin", singin);
    router.get("/singin",authenticate,verifyUser);
    
    router.put('/image/:id',authenticate,cloudinary.upload.single('image'),uploadImage);
    router.get("/event/:id", getEventUser);

    router.get("/singout",authenticate,(req,res)=>{
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    });
    router.route("/:id").get(findOne).put(update).delete(remove);
} catch (error) {
    catchErr(error, "user.route");
}
export default router;

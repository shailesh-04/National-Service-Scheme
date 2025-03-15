import { Router } from "express";
import { catchErr } from "#color";
import cloudinary from "#middleware/cloudinary.middleware.js";
import { uploadImages, findAll,All,eventEmages ,updateAll,remove,countRows} from "#controllers/images.controller.js";
const router = Router();
try {
    router.get("/dashbord", All);
    router.put("/dashbord/:id",cloudinary.upload.single('image'),updateAll);
    router.post("/", cloudinary.upload.array("images", 10), uploadImages);
    router.get("/", findAll);
    router.get("/countRows", countRows);
    router.get("/event", eventEmages);
    router.post("/:id",remove);

} catch (error) {
    catchErr(error, "images.route");
}
export default router;

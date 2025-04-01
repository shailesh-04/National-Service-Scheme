import { Router } from "express";
import { catchErr } from "#color";
import cloudinary from "#middleware/cloudinary.middleware.js";
import  EventController  from "#controllers/events.controller.js";
const router = Router();
const controller = new EventController();
try {
    router.get("/dashbord",controller.All);
    router.post("/dashbord",cloudinary.upload.single("image"),controller.createFull);
    router.put("/dashbord/:id",cloudinary.upload.single("image"),controller.AllUpdate);
    router.get("/", controller.findAll);
    router.post("/", controller.create);
    router.post("/destroy", controller.destroy);
    router.get("/upcoming", controller.upcoming);
    router.get("/restore/:id", controller.restore);
    router.put("/image/:id", cloudinary.upload.single("image"), controller.uploadImage);
    router.route("/:id").get(controller.findOne).put(controller.update).delete(controller.remove);
    
} catch (error) {
    catchErr(error, "event.routers");
}
export default router;

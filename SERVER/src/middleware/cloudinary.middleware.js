import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "#config/cloudinary.config.js";
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images", 
    format: async (req, file) => "png",
    public_id:(req, file) => `${Date.now()}_${req.params.id || req.name || file.originalname}`, // File name without extension
  },
});
export const upload = multer({ storage });
export default {upload}

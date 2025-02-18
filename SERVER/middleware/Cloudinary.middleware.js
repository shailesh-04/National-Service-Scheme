import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "#config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let publicId;
    if (req.id) {
      publicId = `${Date.now()}-${req.id}`;
    } else if (req.name) {
      publicId = `${Date.now()}-${req.name}`;
    } else {
      publicId = file.originalname; // Use the original file name if both id and name are not available
    }
    return {
      folder: "images",
      format: "png",
      public_id: publicId,
    };
  },
});
const upload = multer({ storage });
export const singleUpload = upload.single("image");
export const multipleUpload = upload.array("images", 10);

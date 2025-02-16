import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CreateEvent = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    format: async () => "png", 
    public_id: (req) => `${Date.now()}-${req.body.name}`,
  },
});
export const EventImage = multer({ storage: CreateEvent });

const uploadImages = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    format: async () => "png", 
    public_id: (req) => `${Date.now()}-${req.body.E_id}`,
  },
});
export const EventImages = (multer({ storage: uploadImages })).array("images", 10);

export const deleteImage = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};
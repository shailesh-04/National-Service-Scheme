import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { catchErr } from "#color";
try {
    dotenv.config();
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
} catch (error) {
    catchErr(error, "cloudinary.config.js");
}

export default cloudinary;

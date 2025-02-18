import cloudinary from "../config/cloudinary.js";

/**
 * Delete an image from Cloudinary
 * @param {string} imageId - The public ID of the image to delete
 * @returns {Promise<Object>}
 */
export const deleteImage = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

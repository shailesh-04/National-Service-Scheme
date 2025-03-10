import cloudinary from "#config/cloudinary.config.js";

/**
 * Deletes an image from Cloudinary storage.
 * @param {string} publicId - The public ID of the image to delete.
 * @returns {Promise<object>} - The result of the deletion process.
 */
export const removeImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

export default { removeImage };

import ImageModel from "#models/images.model.js";
import imageService from "#services/image.service.js";
import { catchErr } from "#color";
const model = new ImageModel(); 

export const All = async (req, res) => {
    try {
        const data = await model.findAll();
        res.status(200).json(data);
    } catch (error) {
        catchErr(error, "images.controller.All");
        res.status(500).json({ message:"Failed to fetch all images.",detail:error.message});
    }
};

export const updateAll = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.file?.path;
        const { is_deleted, E_id } = req.body;

        if (!image || !E_id) {
            return res.status(400).json({ message: "Missing required fields: image or E_id." });
        }

        const result = await model.updateAll(id, [E_id, image, is_deleted]);
        res.status(200).json({ message: "Image updated successfully", data: result });
    } catch (error) {
        catchErr(error, "images.controller.updateAll");
        res.status(500).json({ message: "Failed to update image.",detail:error.message });
    }
};

export const uploadImages = async (req, res) => {
    try {
        const { E_id } = req.body;
        const files = req.files;

        if (!E_id || !files || files.length === 0) {
            return res.status(400).json({ message: "E_id and at least one image are required." });
        }

        const imageUrls = files.map(file => file.path);
        const uploadPromises = imageUrls.map(url => model.create([E_id, url]));

        await Promise.all(uploadPromises);
        res.status(201).json({ message: "All images uploaded successfully." });
    } catch (error) {
        catchErr(error, "images.controller.uploadImages");
        res.status(500).json({ message: "Failed to upload images.",detail:error.message });
    }
};

export const findAll = async (req, res) => {
    try {
        const data = await model.findAll();
        res.status(200).json(data);
    } catch (error) {
        catchErr(error, "images.controller.findAll");
        res.status(500).json({ message:"Failed to fetch images.",detail:error.message });
    }
};

export const eventEmages = async (req, res) => {
    try {
        const data = await model.eventImages();
        res.status(200).json(data);
    } catch (error) {
        catchErr(error, "images.controller.eventEmages");
        res.status(500).json({ message:"Failed to fetch event images.",detail:error.message });
    }
};

export const countRows = async (req, res) => {
    try {
        const data = await model.countRows();
        res.status(200).json(data);
    } catch (error) {
        catchErr(error, "images.controller.countRows");
        res.status(500).json({ message:  "Failed to count images.",detail:error.message});
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const { image } = req.body;

        if (!id || !image) {
            return res.status(400).json({ message: "Image ID and URL are required." });
        }

        const publicId = image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
        await imageService.removeImage(publicId);
        await model.remove(id);

        res.status(200).json({ message: "Image removed successfully." });
    } catch (error) {
        catchErr(error, "images.controller.remove");
        res.status(500).json({ message: "Failed to delete image.",detail:error.message});
    }
};

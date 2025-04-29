import Storage from "#models/storage.model.js";
import model from "#models/images.model.js";
import { catchErr } from "#color";

class StorageController {
    static async create(req, res) {
        try {
            const { whyuse, value } = req.body;
            if (!whyuse || !value) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const result = await Storage.create({ whyuse, value });
            res.status(201).json(result);
        } catch (error) {
            catchErr(error, "StorageController.create");
            return res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const entry = await Storage.getById(id);
            if (!entry) {
                return res.status(404).json({ error: "Storage entry not found" });
            }
            res.json(entry);
        } catch (error) {
            catchErr(error, "StorageController.getById");
            return res.status(500).json({ error: error.message });
        }
    }

    static async getImageGallery(req, res) {
        try {
            const entries = await Storage.getByUse("image-gallry");
            if (!entries.length) {
                return res.status(404).json({ error: "Image gallery ID not found in storage" });
            }
            const imageId = entries[0].value;
            const images = await model.GetImages(imageId);
            res.json({ images, imageId });
        } catch (error) {
            catchErr(error, "StorageController.getImageGallery");
            return res.status(500).json({ error: error.message });
        }
    }

    static async UpdateImageGallery(req, res) {
        try {
            const { value } = req.body;
            await Storage.updateValue([value, "image-gallry"]);
            res.json("Successfully Updated");
        } catch (error) {
            catchErr(error, "StorageController.UpdateImageGallery");
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const entries = await Storage.getAll();
            res.json(entries);
        } catch (error) {
            catchErr(error, "StorageController.getAll");
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { whyuse, value } = req.body;

            if (!whyuse || !value) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const updated = await Storage.update(id, { whyuse, value });
            if (!updated.affectedRows) {
                return res.status(404).json({ error: "Storage entry not found" });
            }

            res.json({ message: "Storage entry updated successfully" });
        } catch (error) {
            catchErr(error, "StorageController.update");
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Storage.delete(id);
            if (!deleted.affectedRows) {
                return res.status(404).json({ error: "Storage entry not found" });
            }
            res.json({ message: "Storage entry deleted successfully" });
        } catch (error) {
            catchErr(error, "StorageController.delete");
            return res.status(500).json({ error: error.message });
        }
    }
}

export default StorageController;

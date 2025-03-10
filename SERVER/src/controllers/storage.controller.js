import Storage from "#models/storage.model.js";
import model from "#models/images.model.js";
import { catchErr } from "#color";

class StorageController {
    static async create(req, res) {
        try {
            const { whyuse, value } = req.body;
            if (!whyuse || !value) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }
            Storage.create({ whyuse, value }, (err, entry) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(entry);
            });
        } catch (error) {
            catchErr(error, "StorageController.create");
            return res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            Storage.getById(id, (err, entry) => {
                if (err) return res.status(500).json({ error: err.message });
                if (!entry)
                    return res
                        .status(404)
                        .json({ error: "Storage entry not found" });
                res.json(entry);
            });
        } catch (error) {
            catchErr(error, "StorageController.getById");
            return res.status(500).json({ error: error.message });
        }
    }

    static async getImageGallery(req, res) {
        try {
            Storage.getByUse("image-gallry", (err, entries) => {
                if (err) return res.status(500).json({ error: err.message });
                model.GetImages(entries[0].value, (err, result) => {
                    if (err)
                        return res.status(500).json({ error: err.sqlMessage });
                    res.json({images:result,imageId:entries[0].value});
                });
            });
        } catch (error) {
            catchErr(error, "StorageController.getByUse");
            return res.status(500).json({ error: error.message });
        }
    }
    static async UpdateImageGallery(req,res){
        const data = req.body;
        console.log(data);
        Storage.updateValue([data.value,"image-gallry"],(err)=>{
            if(err)
                return res.status(500).json({ error: err.sqlMessage });
            res.json("Successfuly Update");
        });
    }

    static async getAll(req, res) {
        try {
            Storage.getAll((err, entries) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(entries);
            });
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
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }
            Storage.update(id, { whyuse, value }, (err, updated) => {
                if (err) return res.status(500).json({ error: err.message });
                if (!updated)
                    return res
                        .status(404)
                        .json({ error: "Storage entry not found" });
                res.json({ message: "Storage entry updated successfully" });
            });
        } catch (error) {
            catchErr(error, "StorageController.update");
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            Storage.delete(id, (err, deleted) => {
                if (err) return res.status(500).json({ error: err.message });
                if (!deleted)
                    return res
                        .status(404)
                        .json({ error: "Storage entry not found" });
                res.json({ message: "Storage entry deleted successfully" });
            });
        } catch (error) {
            catchErr(error, "StorageController.delete");
            return res.status(500).json({ error: error.message });
        }
    }
}

export default StorageController;

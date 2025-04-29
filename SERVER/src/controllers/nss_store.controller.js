import NSSStoreModel from "#models/nss_store.model.js";

class NSSStoreController {
    static async getAll(req, res) {
        try {
            const data = await NSSStoreModel.All();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch NSS store items!",
                detail: error.message,
            });
        }
    }

    static async getById(req, res) {
        try {
            const data = await NSSStoreModel.FindById(req.params.id);
            if (!data) {
                return res.status(404).json({ message: "Item not found." });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch NSS store item!",
                detail: error.message,
            });
        }
    }

    static async create(req, res) {
        try {
            const { item_name, number_of_items } = req.body;
            if (!item_name || !number_of_items) {
                return res.status(400).json({ message: "Missing fields" });
            }

            const data = await NSSStoreModel.Create(item_name, number_of_items);
            res.status(201).json({
                message: "Item added successfully",
                data,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to add NSS store item!",
                detail: error.message,
            });
        }
    }

    static async update(req, res) {
        try {
            const { item_name, number_of_items } = req.body;
            const id = req.params.id;

            if (!item_name || !number_of_items) {
                return res.status(400).json({ message: "Missing fields" });
            }

            const result = await NSSStoreModel.Update(id, item_name, number_of_items);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.status(200).json({
                message: "Item updated successfully",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to update NSS store item!",
                detail: error.message,
            });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await NSSStoreModel.Delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.status(200).json({ message: "Item deleted successfully" });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete NSS store item!",
                detail: error.message,
            });
        }
    }
}

export default NSSStoreController;

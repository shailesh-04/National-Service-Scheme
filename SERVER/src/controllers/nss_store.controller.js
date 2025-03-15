
import NSSStoreModel from  "#models/nss_store.model.js";;

class NSSStoreController {
    static async getAll(req, res) {
        try {
            await NSSStoreModel.All((err, data) => {
                if (err) return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error: " + error });
        }
    }

    static async getById(req, res) {
        try {
            await NSSStoreModel.FindById(req.params.id, (err, data) => {
                if (err) return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error: " + error });
        }
    }

    static async create(req, res) {
        try {
            const { item_name, number_of_items } = req.body;
            await NSSStoreModel.Create(item_name, number_of_items, (err, data) => {
                if (err) return res.status(406).json({ message: err.sqlMessage });
                res.status(201).json({ message: "Item added successfully", data });
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error: " + error });
        }
    }

    static async update(req, res) {
        try {
            const { item_name, number_of_items } = req.body;
            await NSSStoreModel.Update(req.params.id, item_name, number_of_items, (err, data) => {
                if (err) return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json({ message: "Item updated successfully", data });
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error: " + error });
        }
    }

    static async delete(req, res) {
        try {
            await NSSStoreModel.Delete(req.params.id, (err, data) => {
                if (err) return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json({ message: "Item deleted successfully" });
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error: " + error });
        }
    }
}

export default NSSStoreController;

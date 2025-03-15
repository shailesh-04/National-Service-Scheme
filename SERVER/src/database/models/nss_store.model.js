import conn from "#config/db.config.js";
class NSSStoreModel {
    static async All(callback) {
        try {
            conn.query(`SELECT * FROM nss_store ORDER BY created_at DESC`, callback);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async FindById(id, callback) {
        try {
            conn.query(`SELECT * FROM nss_store WHERE id = ?`, [id], callback);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async Create(item_name, number_of_items, callback) {
        try {
            conn.query(
                `INSERT INTO nss_store (item_name, number_of_items) VALUES (?, ?)`,
                [item_name, number_of_items],
                callback
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async Update(id, item_name, number_of_items, callback) {
        try {
            conn.query(
                `UPDATE nss_store SET item_name = ?, number_of_items = ? WHERE id = ?`,
                [item_name, number_of_items, id],
                callback
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async Delete(id, callback) {
        try {
            conn.query(`DELETE FROM nss_store WHERE id = ?`, [id], callback);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default NSSStoreModel;


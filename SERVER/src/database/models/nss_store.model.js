import conn from "#config/db.config.js";
class NSSStoreModel {
    static async All() {
        const [resutl] = await conn.query(
            `SELECT * FROM nss_store ORDER BY created_at DESC`
        );
        return resutl;
    }
    static async FindById(id) {
        const [resutl] = await conn.query(
            `SELECT * FROM nss_store WHERE id = ?`,
            [id]
        );
        return resutl;
    }
    static async Create(item_name, number_of_items) {
        const [resutl] = await conn.query(
            `INSERT INTO nss_store (item_name, number_of_items) VALUES (?, ?)`,
            [item_name, number_of_items]
        );
        return resutl;
    }
    static async Update(id, item_name, number_of_items) {
        const [resutl] = await conn.query(
            `UPDATE nss_store SET item_name = ?, number_of_items = ? WHERE id = ?`,
            [item_name, number_of_items, id]
        );
        return resutl;
    }
    static async Delete(id) {
        const [resutl] = await conn.query(
            `DELETE FROM nss_store WHERE id = ?`,
            [id]
        );
        return resutl;
    }
}
export default NSSStoreModel;

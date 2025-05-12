import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class nss_store {
    constructor() {
        this.migration = new Migration(
            "nss_store",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                item_name: ["VARCHAR(255) NOT NULL"],
                number_of_items: [" INT NOT NULL"],
                created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
                updated_at: [
                    "TIMESTAMP",
                    "DEFAULT CURRENT_TIMESTAMP",
                    "ON UPDATE CURRENT_TIMESTAMP",
                ],
            },
            []
        );
    }
    async create(body) {
        const result = await database.query(
            `INSERT INTO ${this.migration.table}() VALUES ()`,
            body
        );
        return result;
    }
    async update(id, body) {
        const result = await database.query(
            `UPDATE ${this.migration.table} SET  WHERE id =${id}`,
            body
        );
        return result;
    }
    async read() {
        const rows = await database.query(
            `SELECT * FROM ${this.migration.table} ORDER BY id DESC`
        );
        return rows;
    }
    async readOne(id) {
        const rows = await database.query(
            `SELECT * FROM ${this.migration.table} WHERE id = ?`,
            [id]
        );
        return rows;
    }
    async delete(id) {
        const result = await database.query(
            `DELETE FROM ${this.migration.table} WHERE id = ?`,
            [id]
        );
        return result;
    }
}
const nss_storeMigration = new nss_store();
export const migration = nss_storeMigration.migration;
export default nss_storeMigration;

import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class app {
    constructor() {
        this.migration = new Migration(
            "app",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                
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
const appMigration = new app();
export const migration = appMigration.migration;
export default appMigration;
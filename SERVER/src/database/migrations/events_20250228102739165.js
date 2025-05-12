import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class events {
    constructor() {
        this.migration = new Migration(
            "events",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                name: [" VARCHAR(255) NOT NULL"],
                description: [" TEXT"],
                location: [" VARCHAR(255)"],
                start_time: [" DATETIME NOT NULL"],
                end_time: ["DATETIME NOT NULL"],
                numOFUser: [" INT NOT NULL DEFAULT 0"],
                image: [" VARCHAR(255)"],
                created_by: [" INT"],
                is_deleted: ["BOOLEAN DEFAULT FALSE"],
                created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
                updated_at: [
                    "TIMESTAMP",
                    "DEFAULT CURRENT_TIMESTAMP",
                    "ON UPDATE CURRENT_TIMESTAMP",
                ],
            },
            ["FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL"]
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
const eventsMigration = new events();
export const migration = eventsMigration.migration;
export default eventsMigration;

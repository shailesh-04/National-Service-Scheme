import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class student {
    constructor() {
        this.migration = new Migration(
            "student",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                name: [" VARCHAR(255) NOT NULL"],
                email: ["VARCHAR(255) UNIQUE NOT NULL"],
                phone: [" VARCHAR(20) NULL"],
                address: [" TEXT NULL"],
                password: [" VARCHAR(255) NOT NULL"],
                college_id: [" INT NOT NULL"],
                course: [" VARCHAR(255) NOT NULL"],
                profile: ["VARCHAR(255 )"],
                is_delete: ["  BOOLEAN DEFAULT FALSE"],
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
const studentMigration = new student();
export const migration = studentMigration.migration;
export default studentMigration;

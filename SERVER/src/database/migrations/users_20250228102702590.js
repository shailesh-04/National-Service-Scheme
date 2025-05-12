import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class usrs {
    constructor() {
        this.migration = new Migration(
            "users",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                name: [" VARCHAR(50) NOT NULL"],
                email: [" VARCHAR(100) UNIQUE NOT NULL"],
                password: [" VARCHAR(100) NOT NULL"],
                phone: [" VARCHAR(20)"],
                role: [" ENUM('1', '2', '3','a') DEFAULT '1'"],
                about: [" text"],
                is_deleted: ["BOOLEAN DEFAULT FALSE"],
                img: [" VARCHAR(255)"],
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
const usrsMigration = new usrs();
export const migration = usrsMigration.migration;
export default usrsMigration;

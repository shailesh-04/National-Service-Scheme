import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class event_attendance {
    constructor() {
        this.migration = new Migration(
            "event_attendance",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                user_id: ["INT NOT NULL"],
                event_id: [" INT NOT NULL"],
                attendance_time: [" TIMESTAMP DEFAULT CURRENT_TIMESTAMP"],
                created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
                updated_at: [
                    "TIMESTAMP",
                    "DEFAULT CURRENT_TIMESTAMP",
                    "ON UPDATE CURRENT_TIMESTAMP",
                ],
            },
            [
                "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE",
                "FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE",
            ]
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
const event_attendanceMigration = new event_attendance();
export const migration = event_attendanceMigration.migration;
export default event_attendanceMigration;

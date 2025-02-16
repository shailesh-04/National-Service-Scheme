import conn from "#config/db.config.js";
import { catchErr } from "#color";
function model() {}
try {
    model.create = async (body, res) => {
        conn.query(
            `INSERT INTO events (name, description, location, start_time, end_time, image, created_by)
            VALUES (?,?,?,?, ?,?,?);`,
            body,
            res
        );
    };
    model.findAll = async (res) => {
        conn.query("SELECT * FROM events WHERE is_deleted = FALSE;", res);
    };

    model.findOne = async (id, res) => {
        conn.query(
            "SELECT * FROM events WHERE id  = ? AND is_deleted = FALSE;",
            id,
            res
        );
    };
    model.update = async (id, body, res) => {
        conn.query(
            `UPDATE events 
            SET name = ?, 
                description = ?, 
                location = ?, 
                start_time = ?, 
                end_time = ?, 
                image = ? 
            WHERE id = ${id};
            `,
            body,
            res
        );
    };
    model.remove = async (id, res) => {
        conn.query(
            `UPDATE events SET is_deleted = TRUE WHERE id = ?;`,
            [id],
            res
        );
    };
} catch (error) {
    catchErr(error, "user.model");
}
export default model;

import conn from "#config/db.config.js";
import { catchErr } from "#color";
class RegistrationModel {
    static async getAll() {
        const [result] = await conn.query("SELECT * FROM registration");
        return result;
    }
    static async inEventfindUsers(id) {
        const [result] = await conn.query(
            "SELECT * FROM registration WHERE event_id = ? ORDER BY id DESC",
            [id]
        );
        return result;
    }
    static async create(body) {
        const [result] = await conn.query(
            "INSERT INTO registration(user_id,event_id) VALUES(?,?)",
            body
        );
        return result;
    }
    static async changeStatus(id, status) {
        const [result] = await conn.query("UPDATE registration SET status = ? where id = ?", [
            status,
            id,
        ]);
        return result;
    }
    static async check(body) {
        const [result] = await conn.query(
            "SELECT * FROM registration WHERE user_id = ? AND event_id = ? ",
            body
        );
        return result;
    }
}
export default RegistrationModel;

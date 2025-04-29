import conn from "#config/db.config.js";
import { catchErr } from "#color";

class User {
    static async All() {
        const [rows] = await conn.query("SELECT * FROM users ORDER BY id DESC");
        return rows;
    }

    static async updateAll(id, body) {
        const query = body.length === 6 
            ? "UPDATE users SET name=?, email=?, password=?, phone=?, role=?, is_deleted=? WHERE id = ?"
            : "UPDATE users SET name=?, email=?, phone=?, role=?, is_deleted=? WHERE id = ?";
        
        const params = body.length === 6 
            ? [...body, id]
            : [...body, id];
            
        const [result] = await conn.query(query, params);
        return result;
    }

    static async create(body) {
        const [result] = await conn.query(
            "INSERT INTO users(name, email, password, phone) VALUES(?, ?, ?, ?)",
            body
        );
        return { id: result.insertId, ...body };
    }

    static async singin(credentials) {
        const [rows] = await conn.query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            credentials
        );
        return rows;
    }

    static async editPassword(email, password) {
        const [result] = await conn.query(
            "UPDATE users SET password = ? WHERE email = ?",
            [password, email]
        );
        return result;
    }

    static async findAll() {
        const [rows] = await conn.query(
            "SELECT id, name, email, password, phone, role, img FROM users"
        );
        return rows;
    }

    static async findOne(id) {
        const [rows] = await conn.query(
            "SELECT id, name, email, phone, role, about, img FROM users WHERE id = ?",
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    static async fineUser(id) {
        const rows = await conn.query(
            "SELECT id, name, email, phone, role, about, img FROM users WHERE is_deleted = FALSE AND id = ?",
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    static async update(id, body) {
        const query = body.length === 4
            ? "UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?"
            : "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
        
        const params = body.length === 4
            ? [...body, id]
            : [...body, id];
            
        const [result] = await conn.query(query, params);
        return result;
    }

    static async remove(id) {
        const [result] = await conn.query("DELETE FROM users WHERE id = ?", [id]);
        return result;
    }

    static async uploadImage(image, id) {
        const [result] = await conn.query(
            "UPDATE users SET img = ? WHERE id = ?",
            [image, id]
        );
        return result;
    }

    static async getEventUser(id) {
        const [rows] = await conn.query(
            "SELECT id, name, email, phone, role, img FROM users WHERE id = ?",
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    static async getUser_email(email) {
        const [rows] = await conn.query(
            "SELECT id, name FROM users WHERE email = ?",
            [email]
        );
        return rows;
    }
}

export default User;
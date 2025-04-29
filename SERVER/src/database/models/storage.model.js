import conn from "#config/db.config.js";

class Storage {
    static async create({ whyuse, value }) {
        const [result] = await conn.query(
            "INSERT INTO storage (whyuse, value) VALUES (?, ?)",
            [whyuse, value]
        );
        return { id: result.insertId, whyuse, value };
    }

    static async getById(id) {
        const [rows] = await conn.query("SELECT * FROM storage WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }

    static async getByUse(whyuse) {
        const [rows] = await conn.query("SELECT * FROM storage WHERE whyuse = ?", [whyuse]);
        return rows;
    }

    static async getAll() {
        const [rows] = await conn.query("SELECT * FROM storage");
        return rows;
    }

    static async update(id, { whyuse, value }) {
        const [result] = await conn.query(
            "UPDATE storage SET whyuse = ?, value = ? WHERE id = ?",
            [whyuse, value, id]
        );
        return result;
    }

    static async updateValue([value, whyuse]) {
        const [result] = await conn.query(
            "UPDATE storage SET value = ? WHERE whyuse = ?",
            [value, whyuse]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await conn.query("DELETE FROM storage WHERE id = ?", [id]);
        return result;
    }
}

export default Storage;

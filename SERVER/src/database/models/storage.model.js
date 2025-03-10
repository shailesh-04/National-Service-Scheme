
import conn from "#config/db.config.js";
import { catchErr } from "#color";

class Storage {
    static async create({ whyuse, value }, callback) {
        try {
            conn.query("INSERT INTO storage (whyuse, value) VALUES (?, ?)", [whyuse, value], (err, result) => {
                if (err) return callback(err);
                callback(null, { id: result.insertId, whyuse, value });
            });
        } catch (error) {
            catchErr(error, "Storage.create");
            callback(error);
        }
    }

    static async getById(id, callback) {
        try {
            conn.query("SELECT * FROM storage WHERE id = ?", [id], (err, rows) => {
                if (err) return callback(err);
                callback(null, rows.length ? rows[0] : null);
            });
        } catch (error) {
            catchErr(error, "Storage.getById");
            callback(error);
        }
    }

    static async getByUse(id, callback) {
        try {
            conn.query("SELECT * FROM storage WHERE whyuse = ?", [id], callback);
        } catch (error) {
            catchErr(error, "Storage.getByUse");
            callback(error);
        }
    }

    static async getAll(callback) {
        try {
            conn.query("SELECT * FROM storage", callback);
        } catch (error) {
            catchErr(error, "Storage.getAll");
            callback(error);
        }
    }

    static async update(id, { whyuse, value }, callback) {
        try {
            conn.query("UPDATE storage SET whyuse = ?, value = ? WHERE id = ?", [whyuse, value, id], (err, result) => {
                if (err) return callback(err);
                callback(null, result.affectedRows > 0);
            });
        } catch (error) {
            catchErr(error, "Storage.update");
            callback(error);
        }
    }

    static async updateValue(params, callback) {
        try {
            conn.query("UPDATE storage SET value = ? WHERE whyuse = ?", params, (err, result) => {
                if (err) return callback(err);
                callback(null, result.affectedRows > 0);
            });
        } catch (error) {
            catchErr(error, "Storage.update");
            callback(error);
        }
    }
    static async delete(id, callback) {
        try {
            conn.query("DELETE FROM storage WHERE id = ?", [id], (err, result) => {
                if (err) return callback(err);
                callback(null, result.affectedRows > 0);
            });
        } catch (error) {
            catchErr(error, "Storage.delete");
            callback(error);
        }
    }
}

export default Storage;

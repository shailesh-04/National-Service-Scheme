// db.js
import { config } from "dotenv";
config();
import mysql from "mysql2/promise";
import color from "#color"; // Make sure this is your actual color logging utility
class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            // ssl: process.env.DB_CA
            //     ? {
            //           ca: process.env.DB_CA,
            //           rejectUnauthorized: true,
            //       }
            //     : undefined,
        });
    }
    async testConnection() {
        try {
             this.conn = await this.pool.getConnection();
            await this.conn.ping();
            this.conn.release();
            color(["✅ Database Connected Successfully!", "brightGreen", "bold"]);
            color(["════════════════════════════════════", "brightMagenta", "bold"]);
        } catch (err) {
            color(["❌ Database Connection Failed!", "brightRed", "bold"]);
            color([`🔍 Error: ${err.message}`, "red", "italic"]);
            throw err;
        }
    }
    async query(sql, params) {
        const connection = await this.pool.getConnection();
        try {
            const [...results] = await connection.query(sql, params);
            return results;
        } finally {
            connection.release();
        }
    }
}
export default new Database();

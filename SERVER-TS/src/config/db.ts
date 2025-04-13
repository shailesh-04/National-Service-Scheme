import { config } from 'dotenv';
config();
import mysql, { Connection } from 'mysql2/promise';
import color from '@color';
class Database {
    public conn!: Connection;
    constructor() {
        this.init();
    }
    public async init() {
        try {
            this.conn = await mysql.createConnection({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                ssl: process.env.DB_CA
                    ? {
                          ca: process.env.DB_CA,
                          rejectUnauthorized: true,
                      }
                    : undefined,
            });

            color(['════════════════════════════════════', 'brightMagenta', 'bold']);
            color(['✅ Database Connected Successfully!', 'brightGreen', 'bold']);
        } catch (err: any) {
            color(['❌ Database Connection Failed!', 'brightRed', 'bold']);
            color([`🔍 Error: ${err.message}`, 'red', 'italic']);
            throw err;
        }
    }
    public async query(sql: string, params?: any[]): Promise<any> {
        if (!this.conn) {
            throw new Error('Database connection not initialized.');
        }
        const [results] = await this.conn.query(sql, params);
        return results;
    }
}
export default new Database();

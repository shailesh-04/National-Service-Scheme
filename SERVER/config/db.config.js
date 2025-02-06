import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
function connectToDatabase() {
    return new Promise((resolve, reject) => {
        conn.connect((err) => {
            if (err) {
                console.error("❌ Error connecting to MySQL:", err);
                reject(err);
            } else {
                console.log("✅ Connected to MySQL Database!");
                resolve(conn);
            }
        });
    });
}
await connectToDatabase();

export default conn;

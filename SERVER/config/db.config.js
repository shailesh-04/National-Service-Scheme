import {config} from "dotenv";
config();
import mysql from "mysql2";
import color from "#color";
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

conn.connect((err) => {
    if (err) {
        color(["❌ Database Connection Failed!", "brightRed", "bold"]);
        color([`🔍 Error: ${err.message}`, "red", "italic"]);
    } else {
        
color(["════════════════════════════════════", "brightMagenta", "bold"]);
        color(["✅ Database Connected Successfully!", "brightGreen", "bold"]);
    }
});

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        conn.connect((err) => {
            if (err) {
                color(["❌ Database Connection Failed!", "brightRed", "bold"]);
                color([`🔍 Error: ${err.message}`, "red", "italic"]);

                reject(err);
            } else {
                
    color(["════════════════════════════════════", "brightMagenta", "bold"]);
                color(["✅ Database Connected Successfully!", "brightGreen", "bold"]);
                resolve(conn);
            }
        });
    });
}
//await connectToDatabase();

export default conn;

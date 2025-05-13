import { Router } from "express";
import conn from "#config/db.config.js";
import { authenticate } from "#middleware/auth.middleware.js";
import { catchErr } from "#color";

const router = Router();

class Test {
    static async getData() {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM events", (err, results) => {
                if (err) {
                    return reject(new Error(err.sqlMessage || err.message));
                }
                return resolve(results);
            });
        });
    }
}

router.get("/test", async (req, res) => {
    try {
        const rows = await Test.getData();
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch all events!",
            detail: error.message,
        });
    }
});

try {
    router.get("/information", authenticate, async (req, res) => {
        const query = `
      SELECT 
        (SELECT COUNT(*) FROM users) AS numOfUsers, 
        (SELECT COUNT(*) FROM events) AS numOfEvents, 
        (SELECT COUNT(*) FROM images) AS numOfImages
    `;
        try {
            const row = await conn.query(query);
            res.status(200).json(row);
        } catch (error) {
            res.status(406).json({ message: "Database Error...", error: err });
        }
    });
} catch (error) {
    catchErr(error, "event.routers");
}
export default router;

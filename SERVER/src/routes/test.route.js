import { Router } from "express";
import conn from "#config/db.config.js";
import { authenticate } from "#middleware/auth.middleware.js";
import { catchErr } from "#color";
const router = Router();
try {
    router.get("/information", authenticate, (req, res) => {
        const query = `
      SELECT 
        (SELECT COUNT(*) FROM users) AS numOfUsers, 
        (SELECT COUNT(*) FROM events) AS numOfEvents, 
        (SELECT COUNT(*) FROM images) AS numOfImages
    `;
        conn.query(query, (err, data) => {
            if (err)
                return res
                    .status(406)
                    .json({ message: "Database Error...", error: err });
            else res.status(200).json(data);
        });
    });
    
} catch (error) {
    catchErr(error, "event.routers");
}
export default router;

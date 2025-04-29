import conn from "#config/db.config.js";
import { catchErr } from "#color";

class ImageModel {
    // Get all images
    async All() {
        const [rows] = await conn.query("SELECT * FROM images");
        return rows;
    }

    // Update image by ID
    async updateAll(id, body) {
        const [result] = await conn.query(
            "UPDATE images SET E_id = ?, imageurl = ?, is_deleted = ? WHERE id = ?",
            [...body, id]
        );
        return result;
    }

    // Create new image
    async create(body) {
        const [result] = await conn.query(
            "INSERT INTO images (E_id, imageurl) VALUES (?, ?)",
            body
        );
        return result;
    }

    // Find all (specific fields)
    async findAll() {
        const [rows] = await conn.query(
            "SELECT id, E_id, imageurl FROM images"
        );
        return rows;
    }

    // Join images with event names
    async eventImages() {
        const [rows] = await conn.query(`
            SELECT 
                images.id, 
                images.E_id, 
                images.imageurl, 
                events.name AS event_name 
            FROM images 
            INNER JOIN events ON images.E_id = events.id
        `);
        return rows;
    }

    // Get images by array of IDs
    async GetImages(IDs) {
        const rows = await conn.query(
            `SELECT * FROM images WHERE id IN (${IDs.join(",")})`
        );
        return rows;
    }

    // Remove image by ID
    async remove(id) {
        const [result] = await conn.query(`DELETE FROM images WHERE id = ?`, [
            id,
        ]);
        return result;
    }

    // Count rows in images
    async countRows() {
        const [rows] = await conn.query(
            `SELECT COUNT(*) AS numOfRow FROM images`
        );
        return rows[0];
    }
}
export default ImageModel;

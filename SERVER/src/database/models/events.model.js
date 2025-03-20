import conn from "#config/db.config.js";
class Model {
    static async All(res) {
        try {
         
                conn.query(
                    `SELECT * FROM events ORDER BY 
                        DATE(end_time) = CURDATE() ASC,
                        start_time DESC`,
                        res
                );
        } catch (error) {
            throw new Error(error);
        }
    }
    static async AllUpdate(id, body, res) {
        try {
            conn.query(
                `UPDATE events SET 
                    name= ?, 
                    description=?, 
                    location=?,
                    image=?,
                    start_time=?, 
                    end_time=?,

                    created_by=?, 
                    is_deleted=?  
                    WHERE id = ${id}; `,
                body,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createFull(body, res) {
        try {
            conn.query(
                `INSERT INTO events (name, description, location, image, start_time, end_time, created_by)
                VALUES (?,?,?,?,?,?,?);`,
                body,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async create(body, res) {
        try {
            conn.query(
                `INSERT INTO events (name, description, location, start_time, end_time, created_by)
                VALUES (?,?,?,?,?,?);`,
                body,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findAll(res) {
        try {
            conn.query(
                `SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by 
                FROM events 
                WHERE is_deleted = false  
                ORDER BY 
                DATE(end_time) = CURDATE() ASC,
                start_time DESC;`,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findOne(id, res) {
        try {
            conn.query(
                "SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by FROM events WHERE id = ? AND is_deleted = FALSE;",
                id,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async update(id, body, res) {
        try {
            conn.query(
                `UPDATE events 
                SET name = ?, 
                    description = ?, 
                    location = ?, 
                    start_time = ?, 
                    end_time = ?, 
                    image = ? 
                WHERE id = ${id};`,
                body,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async remove(id, res) {
        try {
            conn.query(
                `UPDATE events SET is_deleted = TRUE WHERE id = ?;`,
                [id],
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async restore(id, res) {
        try {
            conn.query(
                `UPDATE events SET is_deleted = false WHERE id = ?;`,
                [id],
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async uploadImage(body, res) {
        try {
            conn.query(`UPDATE events SET image = ? WHERE id = ?;`, body, res);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async upcoming(res) {
        try {
            conn.query(
                `SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by FROM events 
                WHERE is_deleted = false 
                AND start_time >= NOW() 
                ORDER BY start_time ASC 
                LIMIT 5;`,
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async addNUmOfUser(id, res) {
        try {
            conn.query(
                `UPDATE events SET numOFUser = numOFUser + 1 WHERE id = ?;`,
                [id],
                res
            );
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Model;

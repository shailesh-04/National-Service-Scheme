import conn from "#config/db.config.js";
class EventModel {
    async All() {
        try {
            const rows = await conn.query(`SELECT * FROM events ORDER BY 
                        DATE(end_time) = CURDATE() ASC,
                        start_time DESC`);
            return rows;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async AllUpdate(id, body) {
        try {
            const result = await conn.query(
                `UPDATE events SET name= ?, description=?,location=?,image=?,start_time=?, end_time=?,created_by=?, is_deleted=?  WHERE id = ${id}; `,
                body
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async createFull(body) {
        try {
            const result = await conn.query(
                `INSERT INTO events (name, description, location, image, start_time, end_time, created_by) VALUES (?,?,?,?,?,?,?);`,
                body
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async create(body) {
        try {
            const result = await conn.query(
                `INSERT INTO events (name, description, location, start_time, end_time, created_by)
                VALUES (?,?,?,?,?,?);`,
                body
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async findAll() {
        try {
            const result = await conn.query(
                `SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by 
                FROM events 
                WHERE is_deleted = false  
                ORDER BY 
                DATE(end_time) = CURDATE() ASC,
                start_time DESC;`
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async findOne(id) {
        try {
            const result = await conn.query(
                "SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by FROM events WHERE id = ? AND is_deleted = FALSE;",
                id
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async update(id, body) {
        try {
            const result = await conn.query(
                `UPDATE events 
                SET name = ?, 
                    description = ?, 
                    location = ?, 
                    start_time = ?, 
                    end_time = ?, 
                    image = ? 
                WHERE id = ${id};`,
                body
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async remove(id) {
        try {
            const result = await conn.query(
                `UPDATE events SET is_deleted = TRUE WHERE id = ?;`,
                [id]
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async tore(id) {
        try {
            const result = await conn.query(
                `UPDATE events SET is_deleted = false WHERE id = ?;`,
                [id]
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async uploadImage(body) {
        try {
            const result = await conn.query(
                `UPDATE events SET image = ? WHERE id = ?;`,
                body
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async upcoming() {
        try {
            const result = await conn.query(
                `SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by FROM events 
                WHERE is_deleted = false 
                AND start_time >= NOW() 
                ORDER BY start_time ASC 
                LIMIT 5;`
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async addNUmOfUser(id) {
        try {
            const result = await conn.query(
                `UPDATE events SET numOFUser = numOFUser + 1 WHERE id = ?;`,
                [id]
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async destroy(id) {
        try {
            const result = await conn.query(`DELETE from events WHERE id = ?;`, [
                id,
            ]);
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
export default EventModel;

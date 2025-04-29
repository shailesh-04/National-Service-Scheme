import db from "#config/db.config.js"; // Make sure the path is correct

class Attendance {
    static async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM event_attendance");
            return rows;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM event_attendance WHERE id = ?",
                [id]
            );
            return rows[0];
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async create(data) {
        try {
            const { user_id, event_id } = data;
            const [result] = await db.query(
                "INSERT INTO event_attendance (user_id, event_id) VALUES (?, ?)",
                [user_id, event_id]
            );
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async update(id, data) {
        const { user_id, event_id } = data;
        try {
            const [result] = await db.query(
                "UPDATE event_attendance SET user_id = ?, event_id = ? WHERE id = ?",
                [user_id, event_id, id]
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query(
                "DELETE FROM event_attendance WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async getEventByAttendanceId(attendanceId) {
        const query = `
            SELECT e.*
            FROM event_attendance a
            JOIN events e ON a.event_id = e.id
            WHERE a.id = ?
        `;
        try {
            const [rows] = await db.query(query, [attendanceId]);
            return rows[0];
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async getUserByAttendanceId(attendanceId) {
        const query = `
            SELECT a.id as attendance_id, u.id as user_id, u.name, u.img
            FROM event_attendance a
            JOIN users u ON a.user_id = u.id
            WHERE a.id = ?
        `;
        try {
            const [rows] = await db.query(query, [attendanceId]);
            return rows[0];
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async getRegistrationUserByEventId(eventId) {
        const query = `
            SELECT 
                r.id AS registration_id,
                u.id AS user_id,
                u.name,
                u.img,
                u.email
            FROM registration r
            JOIN users u ON r.user_id = u.id
            WHERE r.event_id = ? AND r.status = 'confirmed'
            ORDER BY r.id DESC
        `;
        try {
            const [rows] = await db.query(query, [eventId]);
            return rows;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    static async getUsersByEventId(eventId) {
        const query = `
            SELECT 
                a.id,
                u.id AS user_id,
                u.name,
                u.email,
                u.img,
                a.attendance_time
            FROM event_attendance a
            JOIN users u ON a.user_id = u.id
            WHERE a.event_id = ?
            ORDER BY a.attendance_time DESC
        `;
        try {
            const [rows] = await db.query(query, [eventId]);
            return rows;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default Attendance;

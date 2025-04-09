import conn from "#config/db.config.js";
class Attendance {
    static async getAll() {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM event_attendance", (err, results) => {
                if (err) {
                    return reject(new Error(err.sqlMessage || err.message));
                }
                return resolve(results);
            });
        });
    }
    static async getById(id) {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT * FROM event_attendance WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) {
                        return reject(new Error(err.sqlMessage || err.message));
                    }
                    return resolve(results[0]);
                }
            );
        });
    }
    static async create(data) {
        const { user_id, event_id } = data;
        return new Promise((resolve, reject) => {
            conn.query(
                "INSERT INTO event_attendance (user_id, event_id) VALUES (?, ?)",
                [user_id, event_id],
                (err, result) => {
                    if (err) {
                        return reject(new Error(err.sqlMessage || err.message));
                    }
                    return resolve({ id: result.insertId, ...data });
                }
            );
        });
    }

    static async update(id, data) {
        const  { user_id, event_id }= data;
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE event_attendance SET user_id=?, event_id=?  WHERE id = ?",
                [user_id, event_id, id],
                (err, result) => {
                    if (err) {
                        return reject(new Error(err.sqlMessage || err.message));
                    }
                    return resolve(result);
                }
            );
        });
    }
    static async delete(id) {
        return new Promise((resolve, reject) => {
            conn.query(
                "DELETE FROM event_attendance WHERE id = ?",
                [id],
                (err, result) => {
                    if (err) {
                        return reject(new Error(err.sqlMessage || err.message));
                    }
                    return resolve(result);
                }
            );
        });
    }
    static async getEventByAttendanceId(attendanceId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT e.*
                FROM event_attendance a
                JOIN events e ON a.event_id = e.id
                WHERE a.id = ?
            `;
            conn.query(query, [attendanceId], (err, results) => {
                if (err)
                    return reject(new Error(err.sqlMessage || err.message));
                return resolve(results[0]);
            });
        });
    }
    static async getUserByAttendanceId(attendanceId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT a.id as attendance_id,u.id as user_id ,u.name,u.img
                FROM event_attendance a
                JOIN users u ON a.user_id = u.id
                WHERE a.id = ?
            `;
            conn.query(query, [attendanceId], (err, results) => {
                if (err)
                    return reject(new Error(err.sqlMessage || err.message));
                return resolve(results[0]);
            });
        });
    }

    static async getRegistrationUserByEventId(eventId) {
        return new Promise((resolve, reject) => {
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
                ORDER BY r.id DESC;

            `;
            conn.query(query, [eventId], (err, results) => {
                if (err)
                    return reject(new Error(err.sqlMessage || err.message));
                return resolve(results);
            });
        });
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
        return new Promise((resolve, reject) => {
            conn.query(query, [eventId], (err, results) => {
                if (err)
                    return reject(new Error(err.sqlMessage || err.message));
                return resolve(results);
            });
        });
    }
}
export default Attendance;

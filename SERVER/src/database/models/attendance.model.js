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
        const { registration_id } = data;
        return new Promise((resolve, reject) => {
            conn.query(
                "INSERT INTO event_attendance (registation_id) VALUES (?)",
                [registration_id],
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
        const { registration_id } = data;
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE event_attendance SET registation_id = ? WHERE id = ?",
                [registration_id, id],
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
    static async getByRegistrationId(registration_id) {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT * FROM event_attendance WHERE registation_id = ?",
                [registration_id],
                (err, results) => {
                    if (err) {
                        return reject(new Error(err.sqlMessage || err.message));
                    }
                    return resolve(results);
                }
            );
        });
    }
    static async getEventByAttendanceId(attendanceId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT e.*
                FROM event_attendance a
                JOIN registration r ON a.registation_id = r.id
                JOIN events e ON r.event_id = e.id
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
                SELECT u.*
                FROM event_attendance a
                JOIN registration r ON a.registation_id = r.id
                JOIN users u ON r.user_id = u.id
                WHERE a.id = ?
            `;
            conn.query(query, [attendanceId], (err, results) => {
                if (err)
                    return reject(new Error(err.sqlMessage || err.message));
                return resolve(results[0]);
            });
        });
    }
}
export default Attendance;

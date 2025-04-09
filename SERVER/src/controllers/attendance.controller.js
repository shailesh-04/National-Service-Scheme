import Attendance from "#models/attendance.model.js";

class AttendanceController {
    // GET /api/attendance
    static async getAllAttendance(req, res) {
        try {
            const rows = await Attendance.getAll();
            res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch all attendance records!",
                detail: error.message,
            });
        }
    }
    // GET /api/attendance/:id
    static async getAttendanceById(req, res) {
        try {
            const { id } = req.params;
            const row = await Attendance.getById(id);
            if (!row)
                return res
                    .status(404)
                    .json({ message: "Attendance not found" });
            res.status(200).json(row);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch attendance by ID!",
                detail: error.message,
            });
        }
    }

    // POST /api/attendance
    static async createAttendance(req, res) {
        try {
            const { user_id, event_id } = req.body;

            if (!user_id || !event_id) {
                return res
                    .status(400)
                    .json({ message: "user_id and event_id are required" });
            }

            const row = await Attendance.create({ user_id, event_id });
            res.status(201).json(row);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to create attendance!",
                detail: error.message,
            });
        }
    }

    // PUT /api/attendance/:id
    static async updateAttendance(req, res) {
        try {
            const { id } = req.params;
            const { user_id, event_id } = req.body;
            if (!user_id || !event_id) {
                return res
                    .status(400)
                    .json({ message: "user_id and event_id are required" });
            }
            const existing = await Attendance.getById(id);
            if (!existing)
                return res
                    .status(404)
                    .json({ message: "Attendance not found" });

            await Attendance.update(id, { user_id, event_id });
            res.status(200).json({
                message: "Attendance updated successfully",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Failed to update attendance!",
                detail: error.message,
            });
        }
    }

    // DELETE /api/attendance/:id
    static async deleteAttendance(req, res) {
        try {
            const { id } = req.params;
            const existing = await Attendance.getById(id);
            if (!existing)
                return res
                    .status(404)
                    .json({ message: "The attandance user are not avalable in server" });

            await Attendance.delete(id);
            res.status(200).json({
                message: "Attendance deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete attendance!",
                detail: error.message,
            });
        }
    }

    // GET /api/attendance/:id/event
    static async getEventByAttendanceId(req, res) {
        try {
            const { id } = req.params;
            const row = await Attendance.getEventByAttendanceId(id);
            if (!row)
                return res
                    .status(404)
                    .json({ message: "Event not found for this attendance" });
            res.status(200).json(row);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch event for attendance!",
                detail: error.message,
            });
        }
    }

    // GET /api/attendance/:id/user
    static async getUserByAttendanceId(req, res) {
        try {
            const { id } = req.params;
            const row = await Attendance.getUserByAttendanceId(id);
            if (!row)
                return res
                    .status(404)
                    .json({ message: "User not found for this attendance" });
            res.status(200).json(row);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch user for attendance!",
                detail: error.message,
            });
        }
    }

    // GET /api/attendance/:id/registration
    static async getRegistrationUserByEventId(req, res) {
        try {
            const { id } = req.params;
            const row = await Attendance.getRegistrationUserByEventId(id);
            if (!row.length)
                return res
                    .status(404)
                    .json({ message: "Registration not found for this Event" });
            res.status(200).json(row);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch registration users for attendance!",
                detail: error.message,
            });
        }
    }

    //  GET /api/attendance/event/:eventId/users
    static async getUsersByEventId(req, res) {
        try {
            const { eventId } = req.params;
            const users = await Attendance.getUsersByEventId(eventId);
            if (!users.length) {
                return res
                    .status(404)
                    .json({ message: "No users found for this event" });
            }
            res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch users by event ID!",
                detail: error.message,
            });
        }
    }
}

export default AttendanceController;

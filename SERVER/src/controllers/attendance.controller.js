// controllers/attendanceController.js
import Attendance from '#models/attendance.model.js';

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
            if (!row) return res.status(404).json({ message: 'Attendance not found' });
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
            const { registration_id } = req.body;
            if (!registration_id) {
                return res.status(400).json({ message: "registration_id is required" });
            }
            const row = await Attendance.create({ registration_id });
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
            const { registration_id } = req.body;

            const existing = await Attendance.getById(id);
            if (!existing) return res.status(404).json({ message: 'Attendance not found' });

            await Attendance.update(id, { registration_id });
            res.status(200).json({ message: 'Attendance updated successfully' });
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
            if (!existing) return res.status(404).json({ message: 'Attendance not found' });

            await Attendance.delete(id);
            res.status(200).json({ message: 'Attendance deleted successfully' });
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
            if (!row) return res.status(404).json({ message: 'Event not found for this attendance' });
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
            if (!row) return res.status(404).json({ message: 'User not found for this attendance' });
            res.status(200).json(row);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch user for attendance!",
                detail: error.message,
            });
        }
    }
}
export default AttendanceController;

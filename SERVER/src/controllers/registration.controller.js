import { catchErr } from "#color";
import model from "#models/registration.model.js";
import EventModel from "#models/events.model.js";

const modelEvent = new EventModel();

class RegistrationController {
    static async getAll(req, res) {
        try {
            const entries = await model.getAll();
            res.json(entries);
        } catch (error) {
            catchErr(error, "registration getAll");
            return res.status(500).json({
                message: "Internal Server Error",
                detail: error.message
            });
        }
    }

    static async inEventfindUsers(req, res) {
        try {
            const id = req.params.id;
            const entries = await model.inEventfindUsers(id);
            if (!entries.length) {
                return res.status(404).json({ message: "No Row Found" });
            }
            res.json(entries);
        } catch (error) {
            catchErr(error, "registration inEventfindUsers");
            return res.status(500).json({
                message: "Internal Server Error",
                detail: error.message
            });
        }
    }

    static async create(req, res) {
        try {
            const { user_id, event_id } = req.body;
            await model.create([user_id, event_id]);
            try {
                await modelEvent.addNUmOfUser(event_id);
            } catch (err) {
                console.error("Increment Number Of User in event:", err.message);
            }
            res.json({ message: "You are successfully registered!" });
        } catch (error) {
            catchErr(error, "registration create");
            return res.status(500).json({
                message: "Internal Server Error",
                detail: error.message
            });
        }
    }

    static async changeStatus(req, res) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            await model.changeStatus(id, status);
            res.json({ message: "Status has been changed." });
        } catch (error) {
            catchErr(error, "registration changeStatus");
            return res.status(500).json({
                message: "Internal Server Error",
                detail: error.message
            });
        }
    }

    static async check(req, res) {
        try {
            const { user_id, event_id } = req.body;
            const entries = await model.check([user_id, event_id]);
            if (!entries.length) {
                return res.status(404).json({ message: "No Row Found" });
            }
            res.json(entries);
        } catch (error) {
            catchErr(error, "registration check");
            return res.status(500).json({
                message: "Internal Server Error",
                detail: error.message
            });
        }
    }
}

export default RegistrationController;

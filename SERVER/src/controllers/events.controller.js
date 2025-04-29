import { catchErr } from "#color";
import EventModel from "#models/events.model.js";
import UserModel from "#models/users.model.js";
const model = new EventModel();
class EventController {
    // GET api/event/dashbord
    async All(req, res) {
        try {
            const rows = await model.All();
            res.status(200).json(rows);
        } catch (error) {
            catchErr(error.message, "event.controller.All");
            res.status(500).json({
                message: "Failed to fetch all events!",
                detail: error.message,
            });
        }
    }
    // POST api/event/dashbord
    async createFull(req, res) {
        try {
            const {
                name,
                description,
                location,
                start_time,
                end_time,
                created_by,
            } = req.body;
            const file = req.file ? req.file.path : "";
            const result = await model.createFull([
                name,
                description,
                location,
                file,
                start_time,
                end_time,
                created_by,
            ]);
            const data = await model.findOne(result.insertId||result[0].insertId);
            res.status(200).json({
                message: "Successfully created new event!",
                data: data,
            });
        } catch (error) {
            catchErr(error.message, "event.controller.createFull");
            res.status(500).json({
                message: "Failed to create new event!",
                detail: error.message,
            });
        }
    }

    // PUT api/event/dashbord/:id
    async AllUpdate(req, res) {
        try {
            const id = req.params.id;
            const {
                name,
                description,
                location,
                start_time,
                end_time,
                created_by,
                is_deleted,
                image,
            } = req.body;
            const file = req.file ? req.file.path : image;

            const existing = await model.findOne(id);
            if (!existing || existing.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }

            await model.AllUpdate(id, [
                name,
                description,
                location,
                file,
                start_time,
                end_time,
                created_by,
                String(is_deleted) === "true",
            ]);

            res.status(200).json({ message: "Successfully updated event" });
        } catch (error) {
            catchErr(error.message, "event.controller.AllUpdate");
            res.status(500).json({
                message: "Failed to update event!",
                detail: error.message,
            });
        }
    }
    // GET api/event/
    async findAll(req, res) {
        try {
            const data = await model.findAll();
            res.status(200).json(data);
        } catch (error) {
            catchErr(error.message, "event.controller.findAll");
            res.status(500).json({
                message: "Failed to fetch events!",
                detail: error.message,
            });
        }
    }

    // GET api/event/:id
    async findOne(req, res) {
        try {
            const id = req.params.id;
            const data = await model.findOne(id);
            if (!data || data.length === 0) {
                return res.status(404).json({ message: `Event with ID ${id} not found` });
            }
            res.status(200).json(data);
        } catch (error) {
            catchErr(error.message, "event.controller.findOne");
            res.status(500).json({
                message: "Failed to find event!",
                detail: error.message,
            });
        }
    }

    // POST api/event/
    async create(req, res) {
        try {
            const {
                name,
                description,
                location,
                start_time,
                end_time,
                created_by,
            } = req.body;

            await model.create([
                name,
                description,
                location,
                start_time,
                end_time,
                created_by,
            ]);
            res.status(201).json("Successfully added new event");
        } catch (error) {
            catchErr(error.message, "event.controller.create");
            res.status(500).json({
                message: "Failed to create event!",
                detail: error.message,
            });
        }
    }

    // PUT api/event/:id
    async update(req, res) {
        try {
            const id = req.params.id;
            const { name, description, location, start_time, end_time } = req.body;
            await model.update(id, [name, description, location, start_time, end_time]);
            res.status(200).json("Successfully updated event");
        } catch (error) {
            catchErr(error.message, "event.controller.update");
            res.status(500).json({
                message: "Failed to update event!",
                detail: error.message,
            });
        }
    }

    // DELETE api/event/:id
    async remove(req, res) {
        try {
            const id = req.params.id;
            await model.remove(id);
            res.status(200).json("Successfully deleted event");
        } catch (error) {
            catchErr(error.message, "event.controller.remove");
            res.status(500).json({
                message: "Failed to delete event!",
                detail: error.message,
            });
        }
    }

    // POST api/event/destroy
    async destroy(req, res) {
        try {
            const { id } = req.body;
            if (!id) return res.status(406).json({ message: "ID is required in request body" });

            await model.destroy(id);
            res.status(200).json("Successfully permanently deleted event");
        } catch (error) {
            catchErr(error.message, "event.controller.destroy");
            res.status(500).json({
                message: "Failed to destroy event!",
                detail: error.message,
            });
        }
    }

    // GET api/event/restore/:id
    async restore(req, res) {
        try {
            const id = req.params.id;
            const result = await model.restore(id);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No data restored" });
            }
        } catch (error) {
            catchErr(error.message, "event.controller.restore");
            res.status(500).json({
                message: "Failed to restore event!",
                detail: error.message,
            });
        }
    }
    // GET api/event/upcoming
    async upcoming(req, res) {
        try {
            const data = await model.upcoming();
            res.status(200).json(data);
        } catch (error) {
            catchErr(error.message, "event.controller.upcoming");
            res.status(500).json({
                message: "Failed to get upcoming events!",
                detail: error.message,
            });
        }
    }

    // PUT api/event/image/:id
    async uploadImage(req, res) {
        try {
            const id = req.params.id;
            const file = req.file.path;
            await model.uploadImage([file, id]);
            res.status(200).json("Successfully updated event image");
        } catch (error) {
            catchErr(error.message, "event.controller.uploadImage");
            res.status(500).json({
                message: "Failed to upload event image!",
                detail: error.message,
            });
        }
    }
}
export default EventController;

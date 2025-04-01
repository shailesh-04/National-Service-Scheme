import { catchErr } from "#color";
import EventModel from "#models/events.model.js";

const model = new EventModel();

class EventController {
    All = async (req, res) => {
        try {
            await model.All((err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json(data);
            });
        } catch (error) {
            catchErr(error, "event.controll.findall");
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
        }
    };
    AllUpdate = (req, res) => {
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
            model.AllUpdate(
                id,
                [
                    name,
                    description,
                    location,
                    file,
                    start_time,
                    end_time,
                    created_by,
                    String(is_deleted) == "true" ? true : false,
                ],
                (err, data) => {
                    if (err)
                        return res
                            .status(406)
                            .json({ message: err.sqlMessage });
                    res.status(200).json("Succsessfully Update Event..");
                }
            );
        } catch (error) {
            catchErr(error, "event.controll.update");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };
    createFull = async (req, res) => {
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
            model.createFull(
                [
                    name,
                    description,
                    location,
                    file,
                    start_time,
                    end_time,
                    created_by,
                ],
                (err, result) => {
                    if (err)
                        return res
                            .status(406)
                            .json({ message: err.sqlMessage });
                    model.findOne(result.insertId, (err, data) => {
                        if (err)
                            return res
                                .status(406)
                                .json({ message: err.sqlMessage });
                        res.status(201).json({
                            meaage: "Successfully Add New Event..",
                            data: data,
                        });
                    });
                }
            );
        } catch (error) {
            catchErr(error, "event.controll.create");
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
        }
    };
    create = async (req, res) => {
        try {
            const {
                name,
                description,
                location,
                start_time,
                end_time,
                created_by,
            } = req.body;
            model.create(
                [name, description, location, start_time, end_time, created_by],
                (err) => {
                    if (err)
                        return res
                            .status(406)
                            .json({ message: err.sqlMessage });
                    res.status(201).json("Successfully Add New Event..");
                }
            );
        } catch (error) {
            catchErr(error, "event.controll.create");

            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };
    findAll = async (req, res) => {
        try {
            model.findAll((err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json(data);
            });
        } catch (error) {
            catchErr(error, "event.controll.findall");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };

    findOne = (req, res) => {
        try {
            const id = req.params.id;
            model.findOne(id, (err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                if (data.length > 0) res.status(200).json(data);
                else
                    return res
                        .status(404)
                        .json(
                            "Your ID:" +
                                id +
                                " Event Is Not Avalable In Server.."
                        );
            });
        } catch (error) {
            catchErr(error, "event.controll.findOn");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };
    update = (req, res) => {
        try {
            const id = req.params.id;
            const { name, description, location, start_time, end_time } =
                req.body;
            model.update(
                id,
                [name, description, location, start_time, end_time],
                (err, data) => {
                    if (err)
                        return res
                            .status(406)
                            .json({ message: err.sqlMessage });
                    res.status(200).json("Succsessfully Update Event..");
                }
            );
        } catch (error) {
            catchErr(error, "event.controll.update");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };

    remove = (req, res) => {
        try {
            const id = req.params.id;
            model.remove(id, (err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json("Succsessfully Delete Delete..");
            });
        } catch (error) {
            catchErr(error, "event.controll.remove");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };

    destroy = (req, res) => {
        try {
            const { id } = req.body;
            if (!id)
                return res.status(406).json({ message: "Id Require In Body" });
            model.destroy(id, (err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.status(200).json("Succsessfully Destroy Event..");
            });
        } catch (error) {
            catchErr(error, "event.controll.destroy");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };

    restore = (req, res) => {
        try {
            const id = req.params.id;
            model.restore(id, (err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                if (data.length > 0) res.status(200).json(data);
                res.status(200).json("Succsessfully Delete Delete..");
            });
        } catch (error) {
            catchErr(error, "event.controll.remove");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };
    upcoming = (req, res) => {
        try {
            model.upcoming((err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.json(data);
            });
        } catch (error) {
            catchErr(error, "event.controll.remove");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };
    uploadImage = (req, res) => {
        const id = req.params.id;
        const file = req.file.path;
        try {
            model.uploadImage([file, id], (err, data) => {
                if (err)
                    if (err)
                        return res
                            .status(406)
                            .json({ message: err.sqlMessage });
                res.json("Sucsessfuly Update Event Image");
            });
        } catch (error) {
            catchErr(error, "event.controll.remove");
            if (error)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error : " + error });
        }
    };
}

export default EventController;

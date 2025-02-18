import { catchErr } from "#color";
import model from "#models/events.model.js";
export const create = async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            start_time,
            end_time,
            created_by,
        } = req.body;
        const image = req.file.path;
        model.create(
            [
                name,
                description,
                location,
                start_time,
                end_time,
                image,
                created_by,
            ],
            (err, data) => {
                if (err) return res.status(406).json(err.sqlMessage);
                res.status(201).json("new user is create");
            }
        );
    } catch (error) {
        catchErr(error, "event.controll.create");
    }
};
export const findAll = (req, res) => {
    try {
        model.findAll((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.findall");
    }
};

export const findOne = (req, res) => {
    try {
        const id = req.params.id;
        model.findOne(id, (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            if (data.length > 0) res.status(200).json(data);
            else
                return res.status(404).json("Invalid User ID : Not Found User");
        });
    } catch (error) {
        catchErr(error, "event.controll.findOn");
    }
};

export const update = (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, location, start_time, end_time, image } =
            req.body;
        model.update(
            id,
            [name, description, location, start_time, end_time, image],
            (err, data) => {
                if (err) return res.status(406).json(err.sqlMessage);
                res.status(200).json("Succsessfuly Update Change Text..");
            }
        );
    } catch (error) {
        catchErr(error, "event.controll.update");
    }
};
export const remove = (req, res) => {
    try {
        const id = req.params.id;
        model.remove(id, (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            if (data.length > 0) res.status(200).json(data);
            res.status(200).json("Succsessfuly Delete The Record..");
        });
    } catch (error) {
        catchErr(error, "event.controll.remove");
    }
};
export const upcoming = (req, res) => {
    try {
        model.upcoming((err, data) => {
            if (err) if (err) return res.status(406).json(err);
            res.json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.remove");
    }
};

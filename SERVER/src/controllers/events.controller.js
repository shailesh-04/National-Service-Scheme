import { catchErr } from "#color";
import model from "#models/events.model.js";
export const create = async (req, res) => {
    try {
        const {name,description,location,start_time,end_time,created_by,} = req.body;
        model.create([name,description,location,start_time,end_time,created_by,],(err) => {
                if (err) return res.status(406).json(err.sqlMessage);
                res.status(201).json("Successfully Add New Event..");
            }
        );
    } catch (error) {
        catchErr(error, "event.controll.create");
    }
};
export const findAll = async (req, res) => {
    try {
        model.findAll((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.findall");
    }
};
export const All = async (req, res) => {
    try {
        model.All((err, data) => {
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
                return res.status(404).json("Your ID:"+id+" Event Is Not Avalable In Server..");
        });
    } catch (error) {
        catchErr(error, "event.controll.findOn");
    }
};
export const update = (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, location, start_time, end_time} =
            req.body;
        model.update(id,[name, description, location, start_time, end_time],(err, data) => {
                if (err) return res.status(406).json(err.sqlMessage);
                res.status(200).json("Succsessfully Update Event..");
            }
        );
    } catch (error) {
        catchErr(error, "event.controll.update");
    }
};
export const AllUpdate = (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, location, start_time, end_time,numOFUser,created_by,is_deleted} = req.body;
        model.AllUpdate(id,[name, description, location, start_time, end_time,numOFUser,created_by,is_deleted],(err, data) => {
                if (err) return res.status(406).json(err.sqlMessage);
                res.status(200).json("Succsessfully Update Event..");
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
            res.status(200).json("Succsessfully Delete Delete..");
        });
    } catch (error) {
        catchErr(error, "event.controll.remove");
    }
};
export const upcoming = (req, res) => {
    try {
        model.upcoming((err, data) => {
            if (err) if (err) return res.status(406).json(err.sqlMessage);
            res.json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.remove");
    }
};
export const uploadImage = (req, res) => {
    const id = req.params.id;
    const file = req.file.path;
    try {
        model.uploadImage([file,id],(err, data) => {
            if (err) if (err) return res.status(406).json(err.sqlMessage);
            res.json("Sucsessfuly Update Event Image");
        });
    } catch (error) {
        catchErr(error, "event.controll.remove");
    }
};
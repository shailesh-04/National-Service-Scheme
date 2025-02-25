import { catchErr } from "#color";
import model from "#models/users.model.js";
export const All = (req, res) => {
    try {
        model.All((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "user.controll.findall");
    }
};

export const updateAll = (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone, role, is_deleted } = req.body;
        model.updateAll(id, [name, email, password, phone, role, is_deleted], (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json("Succsessfuly Update Update Your Profile..");
        });
    } catch (error) {
        catchErr(error, "user.controll.update");
    }
};


export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        model.create([name, email, password, phone], (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(201).json("You Are Successfully Registed..");
        });
    } catch (error) {
        catchErr(error, "user.controll.sinup");
    }
};
export const singin = (req, res) => {
    try {
        const { email, password } = req.body;
        model.singin([email, password], (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            if (data.length > 0) res.status(200).json("Your Inserted Email And Passaword Is Not Match Any User");
            else
                return res.status(404).json(data);
        });
    } catch (error) {
        catchErr(error, "user.controll.sinin");
    }
};
export const findAll = (req, res) => {
    try {
        model.findAll((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "user.controll.findall");
    }
};

export const findOne = (req, res) => {
    try {
        const id = req.params.id;
        model.findOne(id, (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            if (data.length > 0) res.status(200).json(data);
            else
                return res.status(404).json("You Are File UserID :"+id+" - It ID User Is Not Avalable..");
        });
    } catch (error) {
        catchErr(error, "user.controll.findOn");
    }
};

export const update = (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone } = req.body;
        console.log(req.body);
        model.update(id, [name, email, password, phone], (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json("Succsessfuly Update Update Your Profile..");
        });
    } catch (error) {
        catchErr(error, "user.controll.update");
    }
};

export const remove = (req, res) => {
    try {
        const id = req.params.id;
        model.remove(id, (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json("Succsessfully Delete Your Profile");
        });
    } catch (error) {
        catchErr(error, "user.controll.remove");
    }
};

export const uploadImage = (req, res) => {
    try {
        const id = req.params.id;
        const image = req.file.path;
        model.uploadImage([image, id], (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json("Succsessfully Upload Profile Image");
        });
    } catch (error) {
        catchErr(error, "user.controll.uploadImage");
    }
};

export const getEventUser = (req, res) => {
    try {
        const id = req.params.id;
        model.getEventUser(id, (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            if (data.length > 0) res.status(200).json(data);
            else
            return res.status(404).json("The Event User ID Is Not Avalable In Server..");
        });
    } catch (error) {
        catchErr(error, "user.controll.getEventUser");
    }
};

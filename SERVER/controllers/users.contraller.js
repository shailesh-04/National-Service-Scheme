import { catchErr } from "#color";
import model from "#models/users.model.js";
export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        model.create([name, email, password, phone], (err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(201).json("new user is create");
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
            if (data.length > 0) res.status(200).json(data);
            else
                return res
                    .status(404)
                    .json("User Name And Password Is Not Valid");
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
                return res.status(404).json("Invalid User ID : Not Found User");
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
            res.status(200).json("Succsessfuly Update Change Text..");
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
            res.status(200).json("Succsessfuly Delete The Record..");
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
            res.status(200).json("Succsessfuly Upload Image");
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
                return res.status(404).json("Invalid User ID : Not Found User");
        });
    } catch (error) {
        catchErr(error, "user.controll.getEventUser");
    }
};

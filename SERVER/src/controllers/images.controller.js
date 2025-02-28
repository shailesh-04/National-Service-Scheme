import { catchErr } from "#color";
import model from "#models/images.model.js";

export const All = (req,res) => {
    try {
        model.findAll((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.findall");
    }
};
export const updateAll = (req,res)=>{
    try {
        const id = req.params.id;
        const image = req.file.path;
        const {is_deleted,E_id} = req.body;
        model.updateAll(id,[E_id,image,is_deleted],(err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.findall");
    }
}

export const uploadImages = async (req, res) => {
    try {
        const { E_id } = req.body;
        const files = req.files;
        const imageUrls = files.map((file) => file.path);
        const promises = imageUrls.map((element) => {
            return new Promise((resolve, reject) => {
                model.create([E_id, element], (err) => {
                    if (err) reject(err);
                    else resolve("Successfully uploaded new image");
                });
            });
        });
        Promise.all(promises)
            .then(() =>
                res.status(201).json("All images uploaded successfully")
            )
            .catch((err) => res.status(406).json({ error: err.sqlMessage }));
    } catch (error) {
        catchErr(error, "Images.controll.create");
    }
};
export const findAll = (req,res) => {
    try {
        model.findAll((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.findall");
    }
};
export const eventEmages = (req, res) => {
    try {
        model.eventEmages((err, data) => {
            if (err) return res.status(406).json(err.sqlMessage);
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "event.controll.findall");
    }
};

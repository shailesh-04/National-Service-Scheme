import model from "#models/users.model.js";
export const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;
    model.create([name, email, password, phone], (err, data) => {
        if (err) return res.status(406).json(err.sqlMessage);
        res.status(201).json("new user is create");
    });
};
export const singin = (req, res) => {
    const { email, password } = req.body;
    model.singin([email, password], (err, data) => {
        if (err) return res.status(406).json(err.sqlMessage);
        if (data.length > 0) res.status(200).json(data);
        else return res.status(404).json("User Name And Password Is Not Valid");
    });
};
export const findAll = (req, res) => {
    model.findAll((err, data) => {
        if (err) return res.status(406).json(err.sqlMessage);
        res.status(200).json(data);
    });
};

export const findOne = (req, res) => {
    const id = req.params.id;
    model.findOne(id, (err, data) => {
        if (err) return res.status(406).json(err.sqlMessage);
        if (data.length > 0) res.status(200).json(data);
        else return res.status(404).json("Invalid User ID : Not Found User");
    });
};

export const update = (req, res) => {
    const id = req.params.id;
    const { name, email, password, phone } = req.body;
    model.update(id, [name, email, password, phone], (err, data) => {
        if (err) return res.status(406).json(err.sqlMessage);
        res.status(200).json("Succsessfuly Update Change Text..");
    });
};

export const remove = (req, res) => {
    const id = req.params.id;
    model.remove(id, (err, data) => {
        if (err) return res.status(406).json(err.sqlMessage);
        if (data.length > 0) res.status(200).json(data);
        res.status(200).json("Succsessfuly Delete The Record..");
    });
};

import { catchErr } from "#color";
import model from "#models/users.model.js";
import { createToken } from "#services/jwt.service.js";
import generateOTP from "#services/genarateOTP.js";
import sendEmail from "#services/sendEmail.js";
export const All = (req, res) => {
    try {
        model.All((err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "user.controll.findall");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const updateAll = (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone, role, is_deleted } = req.body;
        const pass =
            password == ""
                ? [name, email, phone, role, is_deleted]
                : [name, email, password, phone, role, is_deleted];

        model.updateAll(id, pass, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            res.status(200).json("Succsessfuly Update User Profile:");
        });
    } catch (error) {
        catchErr(error, "user.controll.update");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const newUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        model.create([name, email, password, phone], (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            model.singin([email, password], async (err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                if (data.length > 0) {
                    res.status(200).json({ data: data[0] });
                } else
                    return res.status(404).json({
                        mesaage: "Acount Is Not Create",
                    });
            });
        });
    } catch (error) {
        catchErr(error, "user.controll.sinup");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        req.session.otp = generateOTP();
        req.session.email = email;
        try {
            await sendEmail(email, req.session.otp);
            res.status(200).json({ send: "OTP sent successfully" }); // Store OTP securely in DB or session
        } catch (error) {
            return res
                .status(500)
                .json({ error: "Error sending email", details: error.message });
        }
    } catch (error) {
        catchErr(error, "user.controll.send otp");
        if (error)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};
export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, otp } = req.body;

        if (!name || !email || !password || !phone)
            return res.status(406).json({ message: "Invalid Data.." });
        if(otp != req.session.otp || email != req.session.email)
            return res
                .status(500)
                .json({ error: "Ivalid OTP"});

        model.create([name, email, password, phone], (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            model.singin([email, password], async (err, data) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                if (data.length > 0) {
                    const token = await createToken(data[0]);
                    res.cookie("token", token);
                    res.status(200).json({ token: token, data: data[0] });
                } else
                    return res.status(404).json({
                        mesaage: "Acount Is Not Create",
                    });
            });
        });
    } catch (error) {
        catchErr(error, "user.controll.sinup");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};
export const singin = async (req, res) => {
    try {
        const { email, password } = req.body;
        model.singin([email, password], async (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            if (data.length > 0) {
                const token = await createToken(data[0]);
                res.cookie("token", token);
                res.status(200).json({ token: token, data: data[0] });
            } else
                return res.status(404).json({
                    mesaage:
                        "Your Inserted Email And Passaword Is Not Match Any User",
                });
        });
    } catch (error) {
        catchErr(error, "user.controll.sinin");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};
export const findAll = (req, res) => {
    try {
        model.findAll((err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            res.status(200).json(data);
        });
    } catch (error) {
        catchErr(error, "user.controll.findall");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const findOne = (req, res) => {
    try {
        const id = req.params.id;
        model.findOne(id, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            if (data.length > 0) res.status(200).json(data);
            else
                return res
                    .status(404)
                    .json(
                        "You Are File UserID :" +
                            id +
                            " - It ID User Is Not Avalable.."
                    );
        });
    } catch (error) {
        catchErr(error, "user.controll.findOn");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const profile = (req, res) => {
    try {
        const id = req.auth.id;
        model.findOne(id, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            if (data.length > 0) res.status(200).json(data);
            else
                return res
                    .status(404)
                    .json(
                        "You Are File UserID :" +
                            id +
                            " - It ID User Is Not Avalable.."
                    );
        });
    } catch (error) {
        catchErr(error, "user.controll.findOn");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const update = (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone } = req.body;
        const data =
            password == ""
                ? [name, email, phone]
                : [name, email, password, phone];
        model.update(id, data, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            res.status(200).json("Succsessfuly Update Update Your Profile..");
        });
    } catch (error) {
        catchErr(error, "user.controll.update");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const remove = (req, res) => {
    try {
        const id = req.params.id;
        model.remove(id, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            res.status(200).json("Succsessfully Delete Your Profile");
        });
    } catch (error) {
        catchErr(error, "user.controll.remove");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const uploadImage = (req, res) => {
    try {
        const id = req.params.id;
        const image = req.file.path;
        model.uploadImage([image, id], (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            res.status(200).json("Succsessfully Upload Profile Image");
        });
    } catch (error) {
        catchErr(error, "user.controll.uploadImage");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const getEventUser = (req, res) => {
    try {
        const id = req.params.id;
        model.getEventUser(id, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            if (data.length > 0) res.status(200).json(data);
            else
                return res
                    .status(404)
                    .json("The Event User ID Is Not Avalable In Server..");
        });
    } catch (error) {
        catchErr(error, "user.controll.getEventUser");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

export const verifyUser = (req, res) => {
    try {
        const id = req.auth.id;
        model.fineUser(id, (err, data) => {
            if (err) return res.status(406).json({ message: err.sqlMessage });
            if (data.length > 0) res.status(200).json(data);
            else
                return res
                    .status(404)
                    .json(
                        "You Are File UserID :" +
                            id +
                            " - It ID User Is Not Avalable.."
                    );
        });
    } catch (error) {
        catchErr(error, "user.controll.verifyuser");
        if (err)
            return res
                .status(500)
                .json({ message: "Internal Server Error : " + error });
    }
};

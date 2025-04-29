import { catchErr } from "#color";
import User from "#models/users.model.js";
import { createToken } from "#services/jwt.service.js";
import generateOTP from "#services/genarateOTP.js";
import sendEmail from "#services/sendEmail.js";

export const All = async (req, res) => {
    try {
        const data = await User.All();
        res.status(200).json(data);
    } catch (error) {
        catchErr(error, "user.controll.findall");
        res.status(500).json({ message: "Internal Server Error : " + error.message });
    }
};

export const updateAll = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone, role, is_deleted } = req.body;
        const pass = password === "" 
            ? [name, email, phone, role, is_deleted] 
            : [name, email, password, phone, role, is_deleted];

        await User.updateAll(id, pass);
        res.status(200).json("Successfully Update User Profile");
    } catch (error) {
        catchErr(error, "user.controll.update");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const newUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        await User.create([name, email, password, phone]);
        
        const data = await User.singin([email, password]);
        if (data && data.length > 0) {
            res.status(200).json({ data: data[0] });
        } else {
            res.status(404).json({ message: "Account Is Not Created" });
        }
    } catch (error) {
        catchErr(error, "user.controll.signup");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const editPassword = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password) {
            return res.status(406).json({ message: "Invalid Data.." });
        }
        if (req.session.otp != otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        await User.editPassword(email, password);
        delete req.session.otp;
        req.session.save();
        res.status(200).json({ message: "Successfully Changed Your Password" });
    } catch (error) {
        catchErr(error, "user.controll.editPassword");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const sendOtp = async (req, res) => {
    try {
        const { email, use } = req.body;
        if (!email) {
            return res.status(500).json({ message: "Error sending email" });
        }

        const otp = generateOTP();
        req.session.otp = otp;
        req.session.save();

        const data = await User.getUser_email(email);
        
        if (!data.length) {
            if (use === "signup") {
                await sendEmail(email, otp);
                return res.status(200).json({ message: "OTP sent successfully" });
            }
            return res.status(404).json({ 
                message: "Error sending OTP - email is not available!" 
            });
        } else {
            if (use === "signup") {
                return res.status(409).json({ 
                    message: "Error sending OTP - email is already registered" 
                });
            }
            await sendEmail(email, otp);
            return res.status(200).json({ message: "OTP sent successfully" });
        }
    } catch (error) {
        catchErr(error, "user.controll.send otp");
        res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, otp } = req.body;
        if (!name || !email || !password) {
            return res.status(406).json({ message: "Invalid Data.." });
        }
        if (req.session.otp != otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        await User.create([name, email, password, phone]);
        const data = await User.singin([email, password]);
        
        if (data && data.length > 0) {
            delete req.session.otp;
            req.session.save();
            const token = await createToken(data[0]);
            res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000 }); // 2 hours
            res.status(200).json({ token: token, data: data[0] });
        } else {
            res.status(404).json({ message: "Account Is Not Created" });
        }
    } catch (error) {
        catchErr(error, "user.controll.signup");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const singin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await User.singin([email, password]);
        
        if (data && data.length > 0) {
            const token = await createToken(data[0]);
            res.cookie("token", token);
            res.status(200).json({ token: token, data: data[0] });
        } else {
            res.status(404).json({ 
                message: "Your email and password don't match any user" 
            });
        }
    } catch (error) {
        catchErr(error, "user.controll.singin");
        res.status(500).json({
            message: "Failed to sign in!",
            detail: error.sqlMessage || error.message,
        });
    }
};

export const findAll = async (req, res) => {
    try {
        const data = await User.findAll();
        res.status(200).json(data);
    } catch (error) {
        catchErr(error, "user.controll.findall");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne(id);
        
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json(`User with ID: ${id} is not available`);
        }
    } catch (error) {
        catchErr(error, "user.controll.findOne");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const profile = async (req, res) => {
    try {
        const id = req.auth.id;
        const data = await User.fineUser(id);
        
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json(`User with ID: ${id} is not available`);
        }
    } catch (error) {
        catchErr(error, "user.controll.profile");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone } = req.body;
        const data = password === "" 
            ? [name, email, phone] 
            : [name, email, password, phone];

        await User.update(id, data);
        res.status(200).json("Successfully Updated Your Profile");
    } catch (error) {
        catchErr(error, "user.controll.update");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await User.remove(id);
        res.status(200).json("Successfully Deleted Your Profile");
    } catch (error) {
        catchErr(error, "user.controll.remove");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const uploadImage = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.file.path;
        await User.uploadImage(image, id);
        res.status(200).json("Successfully Uploaded Profile Image");
    } catch (error) {
        catchErr(error, "user.controll.uploadImage");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const getEventUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.getEventUser(id);
        
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json("The event user ID is not available in server");
        }
    } catch (error) {
        catchErr(error, "user.controll.getEventUser");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};

export const verifyUser = async (req, res) => {
    try {
        const id = req.auth.id;
        const data = await User.fineUser(id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json(`User with ID: ${id} is not available`);
        }
    } catch (error) {
        catchErr(error, "user.controll.verifyUser");
        res.status(error.sqlMessage ? 406 : 500).json({ 
            message: error.sqlMessage || "Internal Server Error" 
        });
    }
};
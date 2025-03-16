import {config} from "dotenv";
import nodemailer from "nodemailer";
config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    host:"smt",
    port:456,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default transporter;

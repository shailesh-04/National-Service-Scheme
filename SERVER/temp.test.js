import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import transporter from "./config/email.config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP route
app.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const otp = generateOTP();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent successfully", otp }); // Store OTP securely in DB or session
    } catch (error) {
        res.status(500).json({ error: "Error sending email", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

import { catchErr } from "#color";
import transporter from "#config/email.config.js";
async function sendEmail(email,otp) {
    try {
        if (!email) {
            throw new Error("Email is required");
        }
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #4A43EC;">🔑 Your One-Time Password (OTP)</h2>
                <p>Hello,</p>
                <p>We received a request to verify your identity. Please use the OTP below to proceed:</p>
                <h3 style="font-size: 24px; background: #F5F7FA; padding: 10px; text-align: center; border-radius: 5px; color: #4A43EC;">
                    ${otp}
                </h3>
                <p>This OTP is valid for <strong>2 minutes</strong>. Do not share it with anyone.</p>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 12px; color: #888;">Need help? Contact our support team.</p>
            </div>
            `,
        };
        await transporter.sendMail(mailOptions);
        return Promise.resolve({ message: "OTP sent successfully", otp });
    } catch (error) {
        catchErr(error, "sendEmail");
        return Promise.reject({
            error: "Failed to send OTP",
            details: error,
        });
    }
}
export default sendEmail;

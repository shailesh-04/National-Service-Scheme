import { createServer } from "http";
import { Server } from "socket.io";
import app from "#config/app.config.js";
import { config } from "dotenv";
config();
export const server = createServer(app);
const allowedOrigins = process.env.CORS ? process.env.CORS.split(",") : [];
const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST"],
    },
});
export default io;

import { createServer } from "http";
import { Server } from "socket.io";
import app from "#config/app.config.js";
export const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
export default io;
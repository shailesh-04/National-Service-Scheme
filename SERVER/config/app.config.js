import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import DataBase from "#config/db.config.js"
import _index from "#src/routes/_index.route.js";
import viewRouters from "#routes/_viewRouters.js";
class App {
    app;
    constructor() {
        this.app = express();
        this.appConfig();
        this.middleware();
        this.routers();
        DataBase.testConnection();
    }
    appConfig() {
        config();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.join(path.dirname(__filename), "../");
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "src", "views"));
    }
    middleware() {
        this.app.use(express.static("public"));

        const allowedOrigins = process.env.CORS
            ? process.env.CORS.split(",")
            : ["*"];

        this.app.use(
            cors({
                origin: allowedOrigins,
                credentials: true,
            })
        );

        this.app.use(express.json());
        this.app.use(cookieParser());

        this.app.use(
            session({
                secret: process.env.EXPRESS_SESSION || "default_secret",
                resave: false,
                saveUninitialized: true,
                cookie: { maxAge: 2 * 60 * 1000 },
            })
        );
    }

    routers() {
        this.app.use("/", viewRouters);
        this.app.use("/api", _index);
    }
}

export default new App().app;

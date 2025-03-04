import express from "express";
import dotenv from "dotenv";
import routers from "#routes/_routers.js";
import viewRouters from "#routes/_viewRouters.js";
import cors from "cors";
import { catchErr } from "#color";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
const app = express();
try {
    dotenv.config();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.join(path.dirname(__filename), "../");
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "src", "views"));
    app.use(express.static("public"));
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(cookieParser());
    app.use("/", viewRouters);
    app.use("/api", routers);
    app.use(
        session({
            secret: process.env.EXPRESS_SESSION,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 2, // 2 minite in milliseconds
                //maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
            },
        })
    );
} catch (error) {
    catchErr(error, "app.config.js");
}
export default app;

import express from "express";
import {config} from "dotenv";
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
    config();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.join(path.dirname(__filename), "../");
    const allowedOrigins = process.env.CORS ? process.env.CORS.split(',') : [];
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "src", "views"));
    app.use(express.static("public"));
    app.use(cors({
        origin: function (origin, callback) {
          console.log(origin);
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.log("Request Origin:", origin);
            callback(new Error('Not allowed by CORS'));
          }
        }
      }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.EXPRESS_SESSION || "default_secret", // Fallback if env is missing
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 2, // 2 minutes
            },
        })
    );
    app.use("/", viewRouters);
    app.use("/api", routers);
} catch (error) {
    catchErr(error, "app.config.js");
}
export default app;

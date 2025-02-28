import express from "express";
import dotenv from "dotenv";
import routers from "#routes/_routers.js";
import viewRouters from "#routes/_viewRouters.js";
import cors from "cors";
import { catchErr } from "#color";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "../");
const app = express();
try {
    dotenv.config();
    app.use(express.static("public"));
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(
        session({
          secret: process.env.EXPRESS_SESSION,
          resave: false,
          saveUninitialized: true,
          cookie: {
            secure: false, // Set to true if using HTTPS
            maxAge: 1000 * 60 * 2, // 2 minite in milliseconds
            //maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        },
        })
      );
      
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "src", "views"));
    app.use("/", viewRouters);
    app.use("/api", routers);
} catch (error) {
    catchErr(error, "app.config.js");
}
export default app;

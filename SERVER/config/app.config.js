import express from "express";
import dotenv from "dotenv";
import routers from "#routes/_routers.js";
import viewRouters from "#routes/_viewRouters.js";
import cors from "cors";
import { catchErr } from "#color";
const app = express();
try {
    dotenv.config();
    app.use(express.static("public"));
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.set("view engine", "ejs");
    app.use("/", viewRouters);
    app.use("/api", routers);

} catch (error) {
    catchErr(error,"app.config.js");
}
export default app;

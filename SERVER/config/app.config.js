import dotenv from "dotenv";
import routers from "#routers/_routers.js";
import viewRouters from "#routers/_viewRouters.js";
import cors from "cors";
const config = (app, express) => {
    dotenv.config();
    app.use(express.static("public"));
    app.use(cors({origin: "*"}));
    app.use(express.json());
    app.set("view engine", "ejs");
    app.use("/", viewRouters);
    app.use("/api", routers);
};
export default config;

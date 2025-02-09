
import express from "express";
import config from "#config/app.config.js";
import console from "#color";
const app = express();
config(app,express);
app.listen(process.env.PORT,()=>{
console(["Server is running on port 3000","red","bold"]);
});
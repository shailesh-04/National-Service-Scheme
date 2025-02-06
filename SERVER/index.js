
import express from "express";
import config from "#config/app.config.js";
import console from "#color";
const app = express();
config(app,express);
app.listen(process.env.PORT,()=>{
console(["Server is running on port 3000","red","bold"]);
console(["Server started at 2/2/2025, 1:35:23 PM"+ new Date().toLocaleString(),'yellow','']);
console(["Visit http://localhost:3000 to see the response.","orenge","underline "]);
});
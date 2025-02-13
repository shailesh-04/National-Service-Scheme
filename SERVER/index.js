import console from "#color";
import {server} from "#config/soket.config.js";
import app from "#config/app.config.js";
app.listen(process.env.PORT,()=>{
    console(["Server is running on port 3000","red","bold"]);
});
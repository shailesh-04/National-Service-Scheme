import color from "#color";
import { server } from "#config/soket.config.js";
import app from "#config/app.config.js";
import conn from "#config/db.config.js";
  
app.listen(process.env.PORT, () => {
    color(["Server is running on port 3000", "red", "bold"]);
});

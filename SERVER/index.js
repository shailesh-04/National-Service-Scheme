import color from "#color";
import { server } from "#config/soket.config.js";
import app from "#config/app.config.js";
import conn from "#config/db.config.js";
app.listen(process.env.PORT, () => {
    color(["\n🚀 Server Status: Running", "brightGreen", "bold"]);
    color(["🌍 Access it at: ", "cyan", "bold"],[`http://localhost:${process.env.PORT}`, "brightCyan", "underline"]);
    color(["⚡ Press Ctrl+C to stop the server", "yellow", "bold"]);
    color(["════════════════════════════════════", "brightMagenta", "bold"]);
  });

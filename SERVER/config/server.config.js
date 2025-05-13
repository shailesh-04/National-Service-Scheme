import color from "#color";
import { server } from "#config/soket.config.js";
function startServer() {
   server.listen(process.env.PORT, "0.0.0.0", () => {
        color(["\n🚀 Server Status: Running", "brightGreen", "bold"]);
        color(
            ["🌍 Access it at: ", "cyan", "bold"],
            [`http://localhost:${process.env.PORT}`, "brightCyan", "underline"]
        );
        color(["⚡ Press Ctrl+C to stop the server", "yellow", "bold"]);
        color([
            "════════════════════════════════════",
            "brightMagenta",
            "bold",
        ]);
    });
    process.on("SIGTERM", () => {
        console.log("Shutting down server...");
        process.exit();
    });
}
export default startServer;

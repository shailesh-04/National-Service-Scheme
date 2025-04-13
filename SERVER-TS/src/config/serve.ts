import color from "@color";
import { server } from "@config/soket";
import app from "@config/app";
function startServer(selectServer:0|1) {
    const PORT:number = Number(process.env.PORT) || 3000;
    let app_server = selectServer===0?app:server;
    app_server.listen(PORT, "0.0.0.0", () => {
        color(["\n🚀 Server Status: Running", "brightGreen", "bold"]);
        color(
            ["🌍 Access it at: ", "cyan", "bold"],
            [`http://localhost:${PORT}`, "brightCyan", "underline"]
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

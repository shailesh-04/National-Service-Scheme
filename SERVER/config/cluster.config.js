import cluster from "cluster";
import os from "os";
import startServer from "./server.config.js";

function startCluster() {
    const numCPUs = os.cpus().length;
    if (cluster.isPrimary) {
        console.log(`Primary process ${process.pid} is running`);
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker, code, signal) => {
            console.log(
                `Worker ${worker.process.pid} died. Starting a new one...`
            );
            cluster.fork();
        });
    } else {
        startServer();
    }
}

export default startCluster;
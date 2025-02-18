import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursive function to get all .js files in directories and subdirectories
const getFilesInDirectory = (dir) => {
    const dirPath = path.join(__dirname, dir);

    if (!fs.existsSync(dirPath)) {
        console.log(`Directory not found: ${dir}`);
        return;
    }

    fs.readdirSync(dirPath).forEach((item) => {
        const itemPath = path.join(dirPath, item);

        if (fs.statSync(itemPath).isDirectory()) {
            if (item !== "node_modules" && item !== "migrations") {
                // Recursive call for subdirectory
                getFilesInDirectory(path.join(dir, item));
            }
        } else if (item.endsWith(".js")) {
            // Load JS module if it's a file
            loadModule(itemPath);
        }
    });
};

// Function to dynamically import a module
async function loadModule(modulePath) {
    try {
        const module = await import(`file://${modulePath}`);
        console.log("Module loaded:", modulePath);
    } catch (error) {
        console.error("Error loading module:", modulePath, error);
    }
}

getFilesInDirectory("./");

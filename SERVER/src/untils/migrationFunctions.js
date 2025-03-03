import { fileURLToPath } from "url";
import { readdir } from "fs/promises";
import path from "path";
import color, { catchErr } from "#color";

export  const getFiles = async () => {
    const resolvedUrl = import.meta.resolve("#migrations/_migration.js");
    const filePath = fileURLToPath(resolvedUrl);
    const directory = path.dirname(filePath);
    try {
        const files = await readdir(directory);

        // Extract name and timestamp from each filename
        const parsedFiles = files
            .map((file) => {
                const match = file.match(/^([a-zA-Z_]+)_(\d+)\.js$/);
                return match ? [match[1], match[2]] : null;
            })
            .filter(Boolean); // Remove null values

        // Sort by timestamp (descending order)
        parsedFiles.sort((a, b) => Number(a[1]) - Number(b[1]));

        return parsedFiles;
    } catch (err) {
        console.error("Error reading directory:", err);
    }
};

export  function consoleColor() {
    color(
        ["Command Line Argument ERROR", "red", ["underline", "bold"]],
        ["\nRun Following Command Example", "yellow", "italic"],
        ["\n\n-> npm run migration <command>  <table_name> "],
        ["\n\n<commandlist>", "bold"],
        [
            `
create 
drop
drop_create
seeders
addcolumn "<column_name> <data_type>"
destroyAll`,
        ]
    );
}

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import color from "#color";

(async () => {
    const args = process.argv.slice(2);

    const showHeader = () => {
        color([
            "\n════════════════════════════════════",
            "brightMagenta",
            ["bold", "underline"],
        ]);
        color(["📦 MIGRATION CLI TOOL", "brightCyan", "bold"]);
    };

    const showUsage = () => {
        showHeader();
        color([
            "\nUsage: node migration.js <command> <tableName> [...params]",
            "yellow",
            "bold",
        ]);
        color(["\n 📃 Available commands:", "brightMagenta", "bold"]);
        color(
            ["  create <tableName>", "green", "bold"],
            ["\n\t└──> Create a new table", "white"]
        );
        color(
            ["  drop <tableName>", "green", "bold"],
            ["\n\t└──> Drop an existing table", "white"]
        );
        color(
            ["  drop-migration <tableName>", "green", "bold"],
            ["\n\t└──> Drop an existing  table and migration", "white"]
        );
        color(
            ["  truncate <tableName>", "green", "bold"],
            ["\n\t└──> Truncate a table", "white"]
        );
        color(
            ["  exists <tableName>", "green", "bold"],
            ["\n\t└──> Check if a table exists", "white"]
        );
        color(
            ["  addColumn <tableName> <columnName> <type...>", "green", "bold"],
            ["\n\t└──> Add a column", "white"]
        );
        color(
            ["  dropColumn <tableName> <columnName>", "green", "bold"],
            ["\n\t└──> Drop a column", "white"]
        );
        color(
            ["  rename <tableName> <newTableName>", "green", "bold"],
            ["\n\t└──> Rename a table", "white"]
        );
        color(
            ["  sql <tableName> <query>", "green", "bold"],
            ["\n\t└──> Execute raw SQL", "white"]
        );
        color(
            ["  refresh <tableName>", "green", "bold"],
            ["\n\t└──> refresh database, all drop then create", "white"]
        );
        color(
            ["\n⚡ Example:", "yellow", "bold"],
            ["npm migration addColumn users age INT", "white"]
        );
        color([
            "════════════════════════════════════\n",
            "brightMagenta",
            ["bold", "underline"],
        ]);
    };

    const [command, tableName, ...rest] = args;
    if (!command) {
        const migrationFolder = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            "../database/migrations"
        );
        const files = fs.readdirSync(migrationFolder);
        const fileNames = files.sort((a, b) => {
            const numA = parseInt(
                a.split("_")[a.split("_").length - 1].split(".")[0]
            );
            const numB = parseInt(
                b.split("_")[b.split("_").length - 1].split(".")[0]
            );
            return numB - numA;
        });
        for (let filename of fileNames.reverse()) {
            try {
                const migrationModule = await import(`#migrations/${filename}`);
                const migration = migrationModule.default.migration;
                await migration.createTable();
            } catch (error) {
                console.error(error.message);
            }
        }
        process.exit(0);
    }
    if (!tableName || tableName == "") {
        showUsage();
        color(["❌ Please specify a table name.", "red", "bold"]);
        process.exit(1);
    }
    const migrationFolder = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../database/migrations"
    );
    const filePattern = new RegExp(`^${tableName.toLowerCase()}_\\d+\\.js$`);
    const files = fs.readdirSync(migrationFolder);

    const migrationFile = files.find((f) => filePattern.test(f));
    if (!migrationFile) {
        color([
            `❌ No migration file found for table '${tableName}'`,
            "red",
            "bold",
        ]);
        process.exit(1);
    }
    const migrationModule = await import(`#migrations/${migrationFile}`);
    const migration = migrationModule.default.migration;
    let d;
    try {
        switch (command) {
            case "create":
                await migration.createTable();
                break;
            case "drop":
                await migration.dropTable();
                break;
            case "drop-migration":
                await migration.dropTable();
                fs.unlinkSync(`${migrationFolder}/${migrationFile}`);
                break;
            case "truncate":
                await migration.truncateTable();
                break;
            case "exists":
                const exists = await migration.tableExists();
                color([
                    `🧾 Table ${tableName} exists: ${exists}`,
                    "cyan",
                    "bold",
                ]);
                break;
            case "addColumn":
                if (rest.length < 2) {
                    color([
                        "❌ Usage: addColumn <tableName> <columnName> <type...>",
                        "red",
                        "bold",
                    ]);
                    break;
                }
                await migration.addColumn(rest[0], rest.slice(1));
                break;
            case "dropColumn":
                if (rest.length < 1) {
                    color([
                        "❌ Usage: dropColumn <tableName> <columnName>",
                        "red",
                        "bold",
                    ]);
                    break;
                }
                await migration.dropColumn(rest[0]);
                break;
            case "rename":
                if (rest.length < 1) {
                    color([
                        "❌ Usage: rename <tableName> <newTableName>",
                        "red",
                        "bold",
                    ]);
                    break;
                }
                await migration.renameTable(rest[0]);
                d = fs.readFileSync(
                    `${migrationFolder}/${migrationFile}`,
                    "utf-8"
                );
                d = d.replace(
                    /this\.migration\s*=\s*new\s*Migration\(".*?"(,[^)]*)/,
                    `this.migration = new Migration("${rest[0]}"$1`
                );
                fs.unlinkSync(`${migrationFolder}/${migrationFile}`);
                const newFileName = migrationFile.split("_");
                newFileName[0] = rest[0];
                fs.writeFileSync(
                    `${migrationFolder}/${newFileName.join("_")}`,
                    d,
                    "utf-8"
                );
                break;

            case "sql":
                if (rest.length < 1) {
                    color(["❌ Usage: sql <tableName> <query>", "red", "bold"]);
                    break;
                }
                const result = await migration.sql(rest.join(" "), []);
                color(
                    ["📄 SQL Result:", "brightGreen", "bold"],
                    [JSON.stringify(result), "white"]
                );
                break;
            default:
                color([`❌ Unknown command '${command}'`, "red", "bold"]);
                showUsage();
                break;
        }
    } catch (error) {
        color(
            ["❌ Command failed:", "red", "bold"],
            [error.sqlMessage || error.message, "white"]
        );
    } finally {
        process.exit(1);
    }
})();

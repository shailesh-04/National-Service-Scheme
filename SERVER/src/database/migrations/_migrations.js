import conn from "#config/db.config.js";
import color, { catchErr } from "#color";
import { getFiles, consoleColor } from "#untils/migrationFunctions.js";
const command = process.argv[2];
const table = process.argv[3];
const fileList = await getFiles();

if (!table || !command) {
    consoleColor();
    process.exit(0);
}
let i = null;

async function loadModule(t, c) {
    await fileList.find((value, index) => {
        if (value[0] === t) {
            i = index;
        }
    });

    try {
        let module;
        try {
            module =
                t !== "all" && c !== "sql"
                    ? await import(`./${fileList[i][0]}_${fileList[i][1]}.js`)
                    : null;
        } catch (error) {
            throw "Not Found File -> " + t;
        }

        let query = "";
        switch (c) {
            case "create":
                query = module.createTable;
                break;
            case "drop":
                query = module.dropTable;
                break;
            case "drop_create":
                await conn.query(module.dropTable);
                query = module.createTable;
                break;
            case "seeders":
                query = module.seeders;
                break;
            case "destroyAll":
                query = module.destroyAll;
                break;
            case "rollback":
                await rollback(t);
                return;
            case "addcolumn":
                query = `${module.AddColumn} ${process.argv[4]}`;
                break;
            case "sql":
                try {
                    const result = await conn.query(t);
                    console.log("Result:", result);
                } catch (err) {
                    console.error(err.sqlMessage);
                }
                return;
            default:
                consoleColor();
                process.exit(0);
        }

        if (query) {
            try {
                await conn.query(query);
                color([
                    "\n════════════════════\n Successfully " + c + " " + table,
                    "yellow",
                    "bold",
                ]);
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        catchErr("_migration", error);
        process.exit(0);
    }
}

async function rollback(t) {
    if (t !== "all") {
        try {
            const module = await import(`./${fileList[i][0]}_${fileList[i][1]}.js`);
            
            await conn.query(module.dropTable);
            color(["Sucssessfuly Drop  " + fileList[i][0], "red", "bold"]);
            
            await conn.query(module.createTable);
            color(["--Successfully created " + fileList[i][0], "green", "bold"]);
        } catch (error) {
            console.log("ERROR", error);
        }
        return;
    }

    // Rollback all tables in reverse order
    for (const tbl of fileList.slice().reverse()) {
        try {
            const module = await import(`./${tbl[0]}_${tbl[1]}.js`);
            await conn.query(module.dropTable);
            color(["Sucssessfuly Drop  " + tbl[0], "red", "bold"]);
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }

    // Create all tables
    for (const tbl of fileList) {
        try {
            const module = await import(`./${tbl[0]}_${tbl[1]}.js`);
            await conn.query(module.createTable);
            color(["--Successfully created " + tbl[0], "green", "bold"]);
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }

    // Run all seeders
    if(process.argv[4] == "seeders" ||process.argv[4] == "s" )
    for (const tbl of fileList) {
        try {
            const module = await import(`./${tbl[0]}_${tbl[1]}.js`);
            await conn.query(module.seeders);
            color(["--Successfully run Seeders " + tbl[0], "yellow", "bold"]);
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }
}

(async () => {
    try {
        await conn.testConnection();
        await loadModule(table, command);
    } catch (error) {
        console.error("Initialization error:", error);
        process.exit(1);
    }
})();
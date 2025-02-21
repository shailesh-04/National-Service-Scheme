import conn from "#config/db.config.js";
import color, { catchErr } from "#color";

const table = process.argv[2];
const command = process.argv[3];

const rbTable = ["images", "events", "users"];

if (!table || !command) {
    color(
        ["Command Line Argument ERROR", "red", ["underline", "bold"]],
        ["\nRun Following Command Example", "yellow", "italic"],
        ["\n\n-> npm run migration <table_name> <command>"],
        ["\n\n<command>", "bold"],
        ["create \n drop \n drop_create \n seeders \n destroyAll"]
    );
    process.exit(0);
}

async function loadModule(t, c) {
    try {
        const module = t !== "all" ? await import(`./${t}.migration.js`) : null;
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
                await rollback();
                return;
            default:
                color(
                    ["Command Line Argument ERROR", "red", ["underline", "bold"]],
                    ["\nRun Following Command Example", "yellow", "italic"],
                    ["\n\n-> npm run migration <table_name> <command>"],
                    ["\n\n<command>", "bold"],
                    ["create \n drop \n drop_create \n seeders \n destroyAll"]
                );
                process.exit(0);
        }

        if (query) {
            conn.query(query, (err) => {
                if (err) return console.error(err.sqlMessage);
                color(["\n DONE ", "green", ["bold", "italic"]]);
            });
        }

    } catch (error) {
        catchErr("_migration", error);
        process.exit(0);
    }
}

async function rollback() {

    for (const tbl of rbTable) {
        try {
            const module = await import(`./${tbl}.migration.js`);
            conn.query(module.dropTable, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color(["Sucssessfuly Drop  " + tbl, "red", "bold"]);
            });
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }

    for (const tbl of rbTable.slice().reverse()) {
        try {
            const module = await import(`./${tbl}.migration.js`);
            conn.query(module.createTable, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color(["--Successfully created " + tbl, "green", "bold"]);
            });
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }
    

    for (const tbl of rbTable.slice().reverse()) {
        try {
            const module = await import(`./${tbl}.migration.js`);
            conn.query(module.seeders, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color(["--Successfully run Seeders " + tbl, "yellow", "bold"]);
            });
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }
    
}

await loadModule(table, command);

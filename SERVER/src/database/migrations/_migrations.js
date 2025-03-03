import conn from "#config/db.config.js";
import color, { catchErr } from "#color";
import { getFiles, consoleColor } from "#untils/migrationFunctions.js";
import e from "express";
const command = process.argv[2];
const table = process.argv[3];
const fileList = await getFiles();
if (!table || !command) {
    consoleColor();
    process.exit(0);
}
var i = null;
async function loadModule(t, c) {
    await fileList.find((value, index, array) => {
        if (value[0] == t) {
            i = index;
        }
    });
    try {
        var module;
        try {
            module =
                (t !== "all" && c !== "sql")
                    ?  await import(`./${fileList[i][0]}_${fileList[i][1]}.js`)
                    : null;
        } catch (error) {
            throw "Not Found FIle -> " + t;
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
                conn.query(t,(err,result)=>{
                    if(err) return console.error(err.sqlMessage);
                    console.log("Result:",result);
                });
                break;
            default:
                consoleColor();
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
async function rollback(t) {
    if (t != "all") {
        try {
            const module = await import(
                `./${fileList[i][0]}_${fileList[i][1]}.js`
            );
            conn.query(module.dropTable, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color(["Sucssessfuly Drop  " + fileList[i][0], "red", "bold"]);
            });
            conn.query(module.createTable, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color([
                    "--Successfully created " + fileList[i][0],
                    "green",
                    "bold",
                ]);
            });
            conn.query(module.seeders, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color([
                    "--Successfully run Seeders " + fileList[i][0],
                    "yellow",
                    "bold",
                ]);
            });
        } catch (error) {
            console.log("ERROR", error);
        }
        return;
    }

    for (const tbl of fileList.slice().reverse()) {
        try {
            const module = await import(`./${tbl[0]}_${tbl[1]}.js`);
            conn.query(module.dropTable, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color(["Sucssessfuly Drop  " + tbl[0], "red", "bold"]);
            });
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }

    for (const tbl of fileList) {
        try {
            const module = await import(`./${tbl[0]}_${tbl[1]}.js`);
            conn.query(module.createTable, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color(["--Successfully created " + tbl[0], "green", "bold"]);
            });
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }

    for (const tbl of fileList) {
        try {
            const module = await import(`./${tbl[0]}_${tbl[1]}.js`);
            conn.query(module.seeders, (err) => {
                if (err) return console.log("SQL ERROR => ", err.sqlMessage);
                color([
                    "--Successfully run Seeders " + tbl[0],
                    "yellow",
                    "bold",
                ]);
            });
        } catch (err) {
            catchErr("_migration/rollback", err);
        }
    }
}
await loadModule(table, command);
conn.end();

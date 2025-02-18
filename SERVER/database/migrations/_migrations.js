import conn from "#config/db.config.js";
import color from "#color";

const table = process.argv[2];
const command = process.argv[3];

if (!table && !command) {
    color(
        ["Command Line Argument ERROR", "red", ["underline", "bold"]],
        ["\nRun Following Command Example", "yellow", "italic"],
        ["\n\n->  npm run migration <table_name> <command>"],
        ["\n\n<command>", "bold"],
        ["create \n drop \n drop&create \n seeders \n all"]
    );
    process.exit(0);
}

async function loadModule(t, c) {
    try {
        const module = await import(`./${t}.migration.js`);
        let query = ''
        switch (c) {
            case "create":
                query = module.createTable;
                break;
            case "drop":
                query = module.dropTable;
                break;
            case "drop_create":
                conn.query(module.dropTable);
                query = module.createTable;
                break;
            case "seeders":
                query = module.seeders;
                break;
            default:
                color(
                    [
                        "Command Line Argument ERROR",
                        "red",
                        ["underline", "bold"],
                    ],
                    ["\nRun Following Command Example", "yellow", "italic"],
                    ["\n\n->  npm run migration <table_name> <command>"],
                    ["\n\n<command>", "bold"],
                    ["create \n drop \n drop_create \n seeders \n all"]
                );
                process.exit(0);
        }
        conn.query(query,(err,data)=>{
            if(err)
                return console.error(err.sqlMessage);
            color(["\n DONE ","green",['bold','italic']]);
        });
    } catch (error) {
        color(
            [
                "Command Line Argument ERROR",
                "red",
                ["underline", "bold"],
            ],
            ["\nRun Following Command Example", "yellow", "italic"],
            ["\n\n->  npm run migration <table_name> <command>"],
            ["\n\n<command>", "bold"],
            ["create \n drop \n drop_create \n seeders \n all"],
            ['\nERRPR=>',error]
        );
        process.exit(0);
    }
}
await loadModule(table, command); // Adjust the path as needed
conn.end();

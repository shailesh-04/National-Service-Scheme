import color from '#src/services/color.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Function to generate migration file
function createMigrationFile(table, directory) {
    if (!fs.existsSync(directory)) {
        console.log("Directory does not exist. Creating directory...");
        fs.mkdirSync(directory, { recursive: true }); 
    }
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
    const fileName = `${table}_${timestamp}.js`;
    const filePath = path.join(directory, fileName);

    const filePattern = new RegExp(`^${table.toLowerCase()}_\\d+\\.js$`);
        const files = fs.readdirSync(directory);
        const migrationFile = files.find((f) => filePattern.test(f));
        if (migrationFile) {
            color(["🔴 Faild to create files", "red", "bold"]);
            color([`the ${table} is already exist in migrations directory`, "red"]);
            throw("migration is already exist!");
        }

    const migrationContent = `import database from "#config/db.config.js";
import Migration from "#utils/Migration.js";
class ${table} {
    constructor() {
        this.migration = new Migration(
            "${table}",
            {
                id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                
                created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
                updated_at: [
                    "TIMESTAMP",
                    "DEFAULT CURRENT_TIMESTAMP",
                    "ON UPDATE CURRENT_TIMESTAMP",
                ],
            },
            []
        );
    }
    async create(body) {
        const result = await database.query(
            \`INSERT INTO \${this.migration.table}() VALUES ()\`,
            body
        );
        return result;
    }
    async update(id, body) {
        const result = await database.query(
            \`UPDATE \${this.migration.table} SET  WHERE id =\${id}\`,
            body
        );
        return result;
    }
    async read() {
        const rows = await database.query(
            \`SELECT * FROM \${this.migration.table} ORDER BY id DESC\`
        );
        return rows;
    }
    async readOne(id) {
        const rows = await database.query(
            \`SELECT * FROM \${this.migration.table} WHERE id = ?\`,
            [id]
        );
        return rows;
    }
    async delete(id) {
        const result = await database.query(
            \`DELETE FROM \${this.migration.table} WHERE id = ?\`,
            [id]
        );
        return result;
    }
}
const ${table}Migration = new ${table}();
export const migration = ${table}Migration.migration;
export default ${table}Migration;
 `
;
    fs.writeFile(filePath, migrationContent.trim(), (err) => {
        if (err) {
            console.error("Error writing migration file:", err);
        } else {
            console.log(`Migration file created at ${filePath}`);
        }
    });
}
const table = process.argv[2];
const resolvedUrl = import.meta.resolve("#migrations/_migration.js");
const filePath = fileURLToPath(resolvedUrl);
const directory = path.dirname(filePath);
if (table) {
    createMigrationFile(table, directory);
    ;
} else {
    console.log("\n\n Please provide a table name");
}

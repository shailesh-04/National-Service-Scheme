import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Function to generate migration file
function createMigrationFile(table, directory) {
    // Check if the directory exists, and if not, create it
    if (!fs.existsSync(directory)) {
        console.log("Directory does not exist. Creating directory...");
        fs.mkdirSync(directory, { recursive: true });  // Create the directory recursively
    }
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Generate a unique timestamp
    const fileName = `${table}_${timestamp}.js`;
    const filePath = path.join(directory, fileName);
    const migrationContent = 
    `
export const table = {
  name: "${table}",
  field: \`
    id INT AUTO_INCREMENT PRIMARY KEY,
    <column> <data_type>,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  \`,
};
export const createTable = \`CREATE TABLE \${table.name} (\${table.field});\`;
export const dropTable = \`DROP TABLE \${table.name};\`;
export const deleteAll = \`DELETE FROM \${table.name};\`;
export const addColumn = \`ALTER TABLE \${table.name} ADD COLUMN \`;
export const dropColumn = \`ALTER TABLE \${table.name} DROP COLUMN <column>;\`;
export const editColumn = \`ALTER TABLE \${table.name} CHANGE COLUMN <old_column> <new_column> <data_type>;\`;
export const seeders = \`INSERT INTO \${table.name} (<column>) VALUES
 (<column_value>),
 (<column_value>),
\`;
export const addIndex = \`CREATE INDEX <index_name> ON \${table.name} (<column>);\`;
export const dropIndex = \`DROP INDEX <index_name> ON \${table.name};\`;
export const addForeignKey = \`ALTER TABLE \${table.name} ADD export CONSTRAINT <export constraint_name> FOREIGN KEY (<column>) REFERENCES <referenced_table>(<referenced_column>);\`;
export const dropForeignKey = \`ALTER TABLE \${table.name} DROP FOREIGN KEY <export constraint_name>;\`;
export const addUniqueConstraint = \`ALTER TABLE \${table.name} ADD CONSTRAINT <export constraint_name> UNIQUE (<column>);\`;
export const dropUniqueConstraint = \`ALTER TABLE \${table.name} DROP CONSTRAINT <constraint_name>;\`;
export default {
    createTable,
    dropTable,
    deleteAll,
    addColumn,
    dropColumn,
    editColumn,
    seeders,
};
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

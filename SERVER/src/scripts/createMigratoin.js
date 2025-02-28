import fs from 'fs';
import path from 'path';

// Function to generate a timestamped migration filename
const getMigrationFilename = (name) => {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    return `${timestamp}_${name}.js`;
};
// Function to create the migration file
const createMigrationFile = (directory, name) => {
    const filename = getMigrationFilename(name);
    const filePath = path.join(directory, filename);

    const content = `export const up = async (knex) => {
  // Write migration logic here
};

export const down = async (knex) => {
  // Rollback logic here
};
`;

    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    // Write the migration file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Migration file created: ${filePath}`);
};

// Example usage: node script.js migrations create_users_table
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node createMigration.js <directory> <migration_name>');
    process.exit(1);
}

const [directory, migrationName] = args;
createMigrationFile(directory, migrationName);

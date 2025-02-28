const fs = require('fs');
const path = require('path');

function createMigrationFile() {
    const timestamp = Date.now();
    const fileName = `user_${timestamp}.migration.js`;
    const filePath = path.join(process.cwd(), fileName);
    
    const content = `export const table = {
    name: 'users',
    columns: {
        id: { type: 'integer', primary: true, autoIncrement: true },
        name: { type: 'string', notNull: true },
        email: { type: 'string', unique: true, notNull: true },
        created_at: { type: 'timestamp', default: 'CURRENT_TIMESTAMP' }
    }
};
    `;

    fs.writeFileSync(filePath, content);
    console.log(`Migration file created: ${fileName}`);
}

createMigrationFile();

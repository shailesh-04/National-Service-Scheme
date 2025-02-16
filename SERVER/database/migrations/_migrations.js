import conn from "#config/db.config.js";
import color from "#color";

const tableNameArg = process.argv[2];
export const tables = [
    {
        name: "users",
        field: `
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            role ENUM('1', '2', '3','a') DEFAULT '1',
            img VARCHAR(255)
        `,
    },
    {
        name: "events",
        field: `
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            location VARCHAR(255),
            start_time DATETIME NOT NULL,
            end_time DATETIME NOT NULL,
            numOFUser INT DEFAULT 0,
            image VARCHAR(255),
            created_by INT,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
        `,
    },
    {
        name:"images",
        field:`
         id INT AUTO_INCREMENT PRIMARY KEY,
         imageurl VARCHAR(255) NOT NULL,
         E_id INT,
         FOREIGN KEY (E_id) REFERENCES events(id) ON DELETE SET NULL
        `
    }
   
];

const migration = async () => {
    let selectedTables = tables;

    // If a specific table name is passed, filter only that table
    if (tableNameArg) {
        selectedTables = tables.filter(t => t.name === tableNameArg);
        if (selectedTables.length === 0) {
            console.log(color([`Error: Table "${tableNameArg}" not found!`, "red", "bold"]));
            conn.end();
            return;
        }
    }

    // Drop tables
    for (let i = selectedTables.length - 1; i >= 0; i--) {
        const table = selectedTables[i];
        await new Promise((resolve) => {
            conn.query(`DROP TABLE IF EXISTS ${table.name}`, (err) => {
                if (err) console.log(err.sqlMessage);
                else color([`Table Dropped: ${table.name}`, "red", "italic"]);
                resolve();
            });
        });
    }

    // Create tables
    for (let table of selectedTables) {
        await new Promise((resolve) => {
            conn.query(`CREATE TABLE ${table.name} (${table.field})`, (err) => {
                if (err) console.log(err.sqlMessage);
                else color([`Table Created: ${table.name}`, "green", "bold"]);
                resolve();
            });
        });
    }
};

migration().then(() => conn.end());

export default migration;

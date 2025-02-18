export const table = {
    name: "temp",
    field: `
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT
        `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE IF EXISTS ${table.name}`;
export const seeders = `INSERT INTO ${table.name} (name, description) VALUES
 ('temp1','temp temp temp temp temp temptemp'),
 ('temp2','temp temp temp temp temp temptemp')`; 
export default {table,dropTable,createTable,seeders};

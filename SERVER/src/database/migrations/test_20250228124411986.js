export const table = {
  name: "test",
  field: `
    id INT AUTO_INCREMENT PRIMARY KEY,
    numofrow INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN `;
export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN `;
export const seeders = `INSERT INTO ${table.name} (numofrow) VALUES
 (1),
 (12),
 (13),
 (14),
 (15),
 (16),
 (17),
 (18),
 (19),
 (10),
 (23);
`;
export const addIndex = `CREATE INDEX <index_name> ON ${table.name} (<column>);`;
export const dropIndex = `DROP INDEX <index_name> ON ${table.name};`;
export const addForeignKey = `ALTER TABLE ${table.name} ADD export CONSTRAINT <export constraint_name> FOREIGN KEY (<column>) REFERENCES <referenced_table>(<referenced_column>);`;
export const dropForeignKey = `ALTER TABLE ${table.name} DROP FOREIGN KEY <export constraint_name>;`;
export const addUniqueConstraint = `ALTER TABLE ${table.name} ADD export CONSTRAINT <constraint_name> UNIQUE (<column>);`;
export const dropUniqueConstraint = `ALTER TABLE ${table.name} DROP CONSTRAINT <constraint_name>;`;
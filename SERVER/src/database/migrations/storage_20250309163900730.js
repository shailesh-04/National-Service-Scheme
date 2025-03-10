export const table = {
  name: "storage",
  field: `
    id INT AUTO_INCREMENT PRIMARY KEY,
    whyuse varchar(20) not null unique,
    value text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN`;
export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN`;
export const seeders = `INSERT INTO ${table.name} (whyuse,value) VALUES
 ('image-gallry','1,2,3,4,5');
`;
export const addIndex = `CREATE INDEX <index_name> ON ${table.name} (<column>);`;
export const dropIndex = `DROP INDEX <index_name> ON ${table.name};`;
export const addForeignKey = `ALTER TABLE ${table.name} ADD export CONSTRAINT <export constraint_name> FOREIGN KEY (<column>) REFERENCES <referenced_table>(<referenced_column>);`;
export const dropForeignKey = `ALTER TABLE ${table.name} DROP FOREIGN KEY <export constraint_name>;`;
export const addUniqueConstraint = `ALTER TABLE ${table.name} ADD CONSTRAINT <export constraint_name> UNIQUE (<column>);`;
export const dropUniqueConstraint = `ALTER TABLE ${table.name} DROP CONSTRAINT <constraint_name>;`;
export default {
    createTable,
    dropTable,
    deleteAll,
    addColumn,
    dropColumn,
    editColumn,
    seeders,
};
export const table = {
  name: "event_attendance",
  field: `
    id INT AUTO_INCREMENT PRIMARY KEY,
    registation_id INT NOT NULL,
    attendance_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (registation_id) REFERENCES registration(id) ON DELETE CASCADE
  `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN <column>;`;
export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN <old_column> <new_column> <data_type>;`;
export const seeders = `INSERT INTO ${table.name} (<column>) VALUES
 (<column_value>),
 (<column_value>),
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
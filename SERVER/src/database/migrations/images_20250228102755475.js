export const table = {
  name: "images",
  field: `
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageurl VARCHAR(255) NOT NULL,
    E_id INT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (E_id) REFERENCES events(id) ON DELETE SET NULL
  `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN <column>;`;
export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN <old_column> <new_column> <data_type>;`;
export const seeders = `INSERT INTO ${table.name} (imageurl, E_id, is_deleted)
VALUES
    ('https://picsum.photos/200/300?random=1', 1, FALSE),
    ('https://picsum.photos/200/300?random=2', 1, FALSE),
    ('https://picsum.photos/200/300?random=3', 2, FALSE),
    ('https://picsum.photos/200/300?random=4', 2, FALSE),
    ('https://picsum.photos/200/300?random=5', 3, FALSE),
    ('https://picsum.photos/200/300?random=6', 3, FALSE),
    ('https://picsum.photos/200/300?random=7', 4, FALSE),
    ('https://picsum.photos/200/300?random=8', 4, FALSE),
    ('https://picsum.photos/200/300?random=9', 5, FALSE),
    ('https://picsum.photos/200/300?random=10', 5, FALSE),
    ('https://picsum.photos/200/300?random=11', 6, FALSE),
    ('https://picsum.photos/200/300?random=12', 6, FALSE),
    ('https://picsum.photos/200/300?random=13', 7, FALSE),
    ('https://picsum.photos/200/300?random=14', 7, FALSE),
    ('https://picsum.photos/200/300?random=15', 8, FALSE),
    ('https://picsum.photos/200/300?random=16', 8, FALSE),
    ('https://picsum.photos/200/300?random=17', 9, FALSE),
    ('https://picsum.photos/200/300?random=18', 9, FALSE),
    ('https://picsum.photos/200/300?random=19', 10, FALSE),
    ('https://picsum.photos/200/300?random=20', 10, FALSE),
    ('https://picsum.photos/200/300?random=21', 11, FALSE),
    ('https://picsum.photos/200/300?random=22', 11, FALSE),
    ('https://picsum.photos/200/300?random=23', 12, FALSE),
    ('https://picsum.photos/200/300?random=24', 12, FALSE),
    ('https://picsum.photos/200/300?random=25', 13, FALSE),
    ('https://picsum.photos/200/300?random=26', 13, FALSE),
    ('https://picsum.photos/200/300?random=27', 14, FALSE),
    ('https://picsum.photos/200/300?random=28', 14, FALSE),
    ('https://picsum.photos/200/300?random=29', 15, FALSE),
    ('https://picsum.photos/200/300?random=30', 15, FALSE);

`;
export const addIndex = `CREATE INDEX <index_name> ON ${table.name} (<column>);`;
export const dropIndex = `DROP INDEX <index_name> ON ${table.name};`;
export const addForeignKey = `ALTER TABLE ${table.name} ADD CONSTRAINT <constraint_name> FOREIGN KEY (<column>) REFERENCES <referenced_table>(<referenced_column>);`;
export const dropForeignKey = `ALTER TABLE ${table.name} DROP FOREIGN KEY <constraint_name>;`;
export const addUniqueConstraint = `ALTER TABLE ${table.name} ADD CONSTRAINT <constraint_name> UNIQUE (<column>);`;
export const dropUniqueConstraint = `ALTER TABLE ${table.name} DROP CONSTRAINT <constraint_name>;`;
export const table = {
  name: "users",
  field: `
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('1', '2', '3','a') DEFAULT '1',
    about text,
    is_deleted BOOLEAN DEFAULT FALSE,
    img VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN `;

export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN <old_column> <new_column> <data_type>;`;

export const seeders = `INSERT INTO ${table.name} (name, email, password, phone, role, about, is_deleted, img) VALUES
    ('John Doe', 'john.doe@example.com', 'password123', '123-456-7890', '1', 'A short bio about John.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=1'),
    ('Jane Smith', 'jane.smith@example.com', 'password123', '987-654-3210', '2', 'A short bio about Jane.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=5'),
    ('Alice Johnson', 'alice.johnson@example.com', 'password123', '555-123-4567', '3', 'A short bio about Alice.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=4'),
    ('Bob Brown', 'bob.brown@example.com', 'password123', '333-444-5555', '1', 'A short bio about Bob.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=1'),
    ('Charlie Davis', 'charlie.davis@example.com', 'password123', '666-777-8888', '2', 'A short bio about Charlie.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=3'),
    ('Eva Green', 'eva.green@example.com', 'password123', '999-000-1111', '3', 'A short bio about Eva.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=2'),
    ('David White', 'david.white@example.com', 'password123', '222-333-4444', '1', 'A short bio about David.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=6'),
    ('Sarah Wilson', 'sarah.wilson@example.com', 'password123', '555-999-8888', '2', 'A short bio about Sarah.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=7'),
    ('Mike Brown', 'mike.brown@example.com', 'password123', '777-888-9999', '3', 'A short bio about Mike.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=8'),
    ('Linda Black', 'linda.black@example.com', 'password123', '444-555-6666', '1', 'A short bio about Linda.', FALSE, 'https://xsgames.co/randomusers/avatar.php?g=male&key=9');
`;

export const addIndex = `CREATE INDEX <index_name> ON ${table.name} (<column>);`;
export const dropIndex = `DROP INDEX <index_name> ON ${table.name};`;
export const addForeignKey = `ALTER TABLE ${table.name} ADD CONSTRAINT <constraint_name> FOREIGN KEY (<column>) REFERENCES <referenced_table>(<referenced_column>);`;
export const dropForeignKey = `ALTER TABLE ${table.name} DROP FOREIGN KEY <constraint_name>;`;
export const addUniqueConstraint = `ALTER TABLE ${table.name} ADD CONSTRAINT <constraint_name> UNIQUE (<column>);`;
export const dropUniqueConstraint = `ALTER TABLE ${table.name} DROP CONSTRAINT <constraint_name>;`;

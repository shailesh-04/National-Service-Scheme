export const table = {
    name: "student",
    field: `
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    password VARCHAR(255) NOT NULL,
    college_id INT NOT NULL,
    course VARCHAR(255) NOT NULL,
    profile VARCHAR(255 ),
    is_delete  BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN <column>;`;
export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN <old_column> <new_column> <data_type>;`;
export const seeders = `
INSERT INTO ${table.name} (name, email, phone, address, password, college_id, course, is_delete, profile) VALUES
('makavana shailesh', 'shailesakoli@gmail.com', '9876543210', '123 Main St, NY', '123qwe', 1, 'Computer Science', false, 'https://media.licdn.com/dms/image/v2/D4D03AQGAarBhVChcAg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721744897322?e=2147483647&v=beta&t=dTcI_A3Ed7GKfndByZjh2MtnLD5Kg3seGzfYJKq3nvA'),
('Jane Smith', 'jane.smith@example.com', '9876543211', '456 Park Ave, CA', 'hashedpassword2', 1, 'Mechanical Engineering', false, 'profiles/jane.jpg'),
('Alice Brown', 'alice.brown@example.com', '9876543212', '789 Oak St, TX', 'hashedpassword3', 1, 'Electrical Engineering', false, 'profiles/alice.jpg'),
('Bob Johnson', 'bob.johnson@example.com', '9876543213', '321 Pine St, FL', 'hashedpassword4', 1, 'Civil Engineering', false, 'profiles/bob.jpg'),
('Charlie White', 'charlie.white@example.com', '9876543214', '654 Maple St, WA', 'hashedpassword5', 1, 'Information Technology', false, 'profiles/charlie.jpg');
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

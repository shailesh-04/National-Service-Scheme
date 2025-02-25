export const table = {
    name: "users",
    field: `
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                role ENUM('1', '2', '3','a') DEFAULT '1',
                is_deleted BOOLEAN DEFAULT FALSE,
                img VARCHAR(255)
        `,
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE  ${table.name}`;
export const destroyAll = `DELETE FROM  ${table.name}`;
export const AddColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const seeders = `INSERT INTO ${table.name} (name, email, password, phone, role, img) VALUES
('John Doe', 'john.doe@example.com', 'hashed_password_1', '1234567890', '1', 'https://picsum.photos/200/300?random=1'),
('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', '0987654321', '2', 'https://picsum.photos/200/300?random=2'),
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password_3', '1112223333', '3', 'https://picsum.photos/200/300?random=3'),
('Bob Brown', 'bob.brown@example.com', 'hashed_password_4', '4445556666', 'a', 'https://picsum.photos/200/300?random=4'),
('Charlie White', 'charlie.white@example.com', 'hashed_password_5', '7778889999', '1', 'https://picsum.photos/200/300?random=5'),
('David Green', 'david.green@example.com', 'hashed_password_6', '1122334455', '2', 'https://picsum.photos/200/300?random=6'),
('Emma Wilson', 'emma.wilson@example.com', 'hashed_password_7', '2233445566', '3', 'https://picsum.photos/200/300?random=7'),
('Frank Harris', 'frank.harris@example.com', 'hashed_password_8', '3344556677', 'a', 'https://picsum.photos/200/300?random=8'),
('Grace Lewis', 'grace.lewis@example.com', 'hashed_password_9', '4455667788', '1', 'https://picsum.photos/200/300?random=9'),
('Henry Young', 'henry.young@example.com', 'hashed_password_10', '5566778899', '2', 'ihttps://picsum.photos/200/300?random=10'),
('Isabella King', 'isabella.king@example.com', 'hashed_password_11', '6677889900', '3', 'ihttps://picsum.photos/200/300?random=11'),
('Jack Scott', 'jack.scott@example.com', 'hashed_password_12', '7788990011', 'a', 'ihttps://picsum.photos/200/300?random=12'),
('Katherine Hall', 'katherine.hall@example.com', 'hashed_password_13', '8899001122', '1', 'ihttps://picsum.photos/200/300?random=13'),
('Liam Allen', 'liam.allen@example.com', 'hashed_password_14', '9900112233', '2', 'ihttps://picsum.photos/200/300?random=14'),
('Mia Adams', 'mia.adams@example.com', 'hashed_password_15', '0011223344', '3', 'ihttps://picsum.photos/200/300?random=15'),
('Nathan Baker', 'nathan.baker@example.com', 'hashed_password_16', '1122334455', 'a', 'ihttps://picsum.photos/200/300?random=16'),
('Olivia Carter', 'olivia.carter@example.com', 'hashed_password_17', '2233445566', '1', 'ihttps://picsum.photos/200/300?random=17'),
('Paul Mitchell', 'paul.mitchell@example.com', 'hashed_password_18', '3344556677', '2', 'ihttps://picsum.photos/200/300?random=18'),
('Quinn Perez', 'quinn.perez@example.com', 'hashed_password_19', '4455667788', '3', 'ihttps://picsum.photos/200/300?random=19'),
('Rachel Cox', 'rachel.cox@example.com', 'hashed_password_20', '5566778899', 'a', 'ihttps://picsum.photos/200/300?random=20');
`; 
export default {table,dropTable,createTable,seeders};

export const table = {
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
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE IF EXISTS ${table.name}`;
export const seeders = `INSERT INTO ${table.name} (name, email, password, phone, role, img) VALUES
('John Doe', 'john.doe@example.com', 'hashed_password_1', '1234567890', '1', 'img1.jpg'),
('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', '0987654321', '2', 'img2.jpg'),
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password_3', '1112223333', '3', 'img3.jpg'),
('Bob Brown', 'bob.brown@example.com', 'hashed_password_4', '4445556666', 'a', 'img4.jpg'),
('Charlie White', 'charlie.white@example.com', 'hashed_password_5', '7778889999', '1', 'img5.jpg'),
('David Green', 'david.green@example.com', 'hashed_password_6', '1122334455', '2', 'img6.jpg'),
('Emma Wilson', 'emma.wilson@example.com', 'hashed_password_7', '2233445566', '3', 'img7.jpg'),
('Frank Harris', 'frank.harris@example.com', 'hashed_password_8', '3344556677', 'a', 'img8.jpg'),
('Grace Lewis', 'grace.lewis@example.com', 'hashed_password_9', '4455667788', '1', 'img9.jpg'),
('Henry Young', 'henry.young@example.com', 'hashed_password_10', '5566778899', '2', 'img10.jpg'),
('Isabella King', 'isabella.king@example.com', 'hashed_password_11', '6677889900', '3', 'img11.jpg'),
('Jack Scott', 'jack.scott@example.com', 'hashed_password_12', '7788990011', 'a', 'img12.jpg'),
('Katherine Hall', 'katherine.hall@example.com', 'hashed_password_13', '8899001122', '1', 'img13.jpg'),
('Liam Allen', 'liam.allen@example.com', 'hashed_password_14', '9900112233', '2', 'img14.jpg'),
('Mia Adams', 'mia.adams@example.com', 'hashed_password_15', '0011223344', '3', 'img15.jpg'),
('Nathan Baker', 'nathan.baker@example.com', 'hashed_password_16', '1122334455', 'a', 'img16.jpg'),
('Olivia Carter', 'olivia.carter@example.com', 'hashed_password_17', '2233445566', '1', 'img17.jpg'),
('Paul Mitchell', 'paul.mitchell@example.com', 'hashed_password_18', '3344556677', '2', 'img18.jpg'),
('Quinn Perez', 'quinn.perez@example.com', 'hashed_password_19', '4455667788', '3', 'img19.jpg'),
('Rachel Cox', 'rachel.cox@example.com', 'hashed_password_20', '5566778899', 'a', 'img20.jpg');
`; 
export default {table,dropTable,createTable,seeders};

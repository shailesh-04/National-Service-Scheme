export const table = {
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
};
export const createTable = `CREATE TABLE ${table.name} (${table.field});`;
export const dropTable = `DROP TABLE ${table.name};`;
export const deleteAll = `DELETE FROM ${table.name};`;
export const addColumn = `ALTER TABLE ${table.name} ADD COLUMN `;
export const dropColumn = `ALTER TABLE ${table.name} DROP COLUMN <column>;`;
export const editColumn = `ALTER TABLE ${table.name} CHANGE COLUMN <old_column> <new_column> <data_type>;`;
export const seeders = `INSERT INTO ${table.name} (name, description, location, start_time, end_time, numOFUser, image, created_by, is_deleted)
VALUES
    ('Tech Conference 2023', 'A conference about the latest trends in technology.', 'New York, NY', '2023-09-10 09:00:00', '2023-09-10 17:00:00', 500, 'https://picsum.photos/200/300?random=1', 1, FALSE),
    ('Marketing Summit 2022', 'An event for marketing professionals to share insights.', 'San Francisco, CA', '2022-11-12 09:30:00', '2022-11-12 17:30:00', 350, 'https://picsum.photos/200/300?random=2', 2, FALSE),
    ('AI Expo 2024', 'Explore the future of Artificial Intelligence at this event.', 'Los Angeles, CA', '2024-05-15 10:00:00', '2024-05-15 18:00:00', 800, 'https://picsum.photos/200/300?random=3', 3, FALSE),
    ('Digital Marketing Workshop', 'Hands-on workshop for learning digital marketing strategies.', 'Chicago, IL', '2023-07-05 14:00:00', '2023-07-05 17:00:00', 100, 'https://picsum.photos/200/300?random=4', 4, FALSE),
    ('Product Launch Event', 'Introducing our new product to the market!', 'Miami, FL', '2025-02-28 09:00:00', '2025-02-28 12:00:00', 300, 'https://picsum.photos/200/300?random=5', 5, FALSE),
    ('Blockchain Summit 2025', 'A summit focused on the future of blockchain technology.', 'Seattle, WA', '2025-03-20 10:00:00', '2025-03-20 16:00:00', 450, 'https://picsum.photos/200/300?random=6', 6, FALSE),
    ('Web Development Bootcamp', 'An intensive course on modern web development technologies.', 'Austin, TX', '2024-01-10 09:00:00', '2024-01-10 17:00:00', 150, 'https://picsum.photos/200/300?random=7', 7, FALSE),
    ('Virtual Reality Showcase', 'Experience the latest in virtual reality technology.', 'San Diego, CA', '2023-12-15 09:00:00', '2023-12-15 13:00:00', 200, 'https://picsum.photos/200/300?random=8', 8, FALSE),
    ('Health Tech Conference', 'Innovation in health tech and medical devices.', 'Boston, MA', '2025-06-10 10:00:00', '2025-06-10 17:00:00', 400, 'https://picsum.photos/200/300?random=9', 9, FALSE),
    ('E-Commerce Summit 2023', 'A summit for E-Commerce leaders to discuss industry trends.', 'Las Vegas, NV', '2023-11-05 09:00:00', '2023-11-05 18:00:00', 350, 'https://picsum.photos/200/300?random=10', 10, FALSE),
    ('Artificial Intelligence Symposium', 'In-depth discussions on AI advancements and future applications.', 'Dallas, TX', '2023-08-25 09:30:00', '2023-08-25 17:00:00', 250, 'https://picsum.photos/200/300?random=11', 1, FALSE),
    ('Startup Pitch Night', 'An event for startups to pitch their ideas to investors.', 'Palo Alto, CA', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 100, 'https://picsum.photos/200/300?random=12', 2, FALSE),
    ('Data Science Conference', 'Conference focusing on the latest in data science and analytics.', 'Washington, D.C.', '2024-06-22 10:00:00', '2024-06-22 16:00:00', 600, 'https://picsum.photos/200/300?random=13', 3, FALSE),
    ('Mobile App Development Expo', 'Learn and network at the biggest mobile app development event.', 'Atlanta, GA', '2024-09-12 09:00:00', '2024-09-12 17:00:00', 700, 'https://picsum.photos/200/300?random=14', 4, FALSE),
    ('Tech Startup Weekend', 'A weekend event to help launch tech startups.', 'Denver, CO', '2025-04-05 12:00:00', '2025-04-05 20:00:00', 120, 'https://picsum.photos/200/300?random=15', 5, FALSE);

`;
export const addIndex = `CREATE INDEX <index_name> ON ${table.name} (<column>);`;
export const dropIndex = `DROP INDEX <index_name> ON ${table.name};`;
export const addForeignKey = `ALTER TABLE ${table.name} ADD CONSTRAINT <constraint_name> FOREIGN KEY (<column>) REFERENCES <referenced_table>(<referenced_column>);`;
export const dropForeignKey = `ALTER TABLE ${table.name} DROP FOREIGN KEY <constraint_name>;`;
export const addUniqueConstraint = `ALTER TABLE ${table.name} ADD CONSTRAINT <constraint_name> UNIQUE (<column>);`;
export const dropUniqueConstraint = `ALTER TABLE ${table.name} DROP CONSTRAINT <constraint_name>;`;

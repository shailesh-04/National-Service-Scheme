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
export const createTable = `CREATE TABLE ${table.name} (${table.field})`;
export const dropTable = `DROP TABLE IF EXISTS ${table.name}`;
export const seeders = `INSERT INTO ${table.name} (name, description, location, start_time, end_time, numOFUser, image, created_by, is_deleted) VALUES
('Tech Conference 2024', 'A global tech conference featuring top speakers.', 'San Francisco, CA', '2024-06-15 09:00:00', '2024-06-15 18:00:00', 150, 'https://example.com/images/tech_conf.jpg', 2, FALSE),
('Music Festival', 'Annual outdoor music festival with live performances.', 'Los Angeles, CA', '2025-08-20 14:00:00', '2025-08-22 23:00:00', 5000, 'https://example.com/images/music_festival.jpg', 2, FALSE),
('Business Expo', 'Networking event for startups and investors.', 'New York, NY', '2025-05-10 10:00:00', '2025-05-10 17:00:00', 300, 'https://example.com/images/business_expo.jpg', 2, FALSE),
('AI Summit', 'Discussion on the future of AI and machine learning.', 'Boston, MA', '2025-07-05 09:30:00', '2025-07-05 16:30:00', 200, 'https://example.com/images/ai_summit.jpg', 2, FALSE),
('Food Carnival', 'A festival showcasing diverse culinary delights.', 'Chicago, IL', '2024-09-12 12:00:00', '2024-09-12 20:00:00', 1000, 'https://example.com/images/food_carnival.jpg', 2, FALSE),
('Health & Wellness Retreat', 'A retreat focused on mental and physical well-being.', 'Hawaii', '2024-11-18 08:00:00', '2024-11-20 20:00:00', 100, 'https://example.com/images/health_retreat.jpg', 2, FALSE),
('E-Sports Championship', 'Gaming competition with global teams.', 'Las Vegas, NV', '2025-06-10 10:00:00', '2025-06-12 22:00:00', 500, 'https://example.com/images/esports_championship.jpg', 2, FALSE),
('Art Exhibition', 'Showcase of contemporary artworks by renowned artists.', 'Paris, France', '2024-10-25 11:00:00', '2024-10-30 18:00:00', 800, 'https://example.com/images/art_exhibition.jpg', 2, FALSE),
('Book Fair', 'Meet your favorite authors and explore thousands of books.', 'London, UK', '2025-03-15 09:00:00', '2025-03-17 19:00:00', 1200, 'https://example.com/images/book_fair.jpg', 2, FALSE),
('Charity Marathon', 'A fundraising run for a noble cause.', 'Berlin, Germany', '2024-12-05 07:00:00', '2024-12-05 14:00:00', 2500, 'https://example.com/images/charity_marathon.jpg', 2, FALSE),
('Fashion Week', 'The latest trends from top fashion designers.', 'Milan, Italy', '2025-09-01 10:00:00', '2025-09-07 22:00:00', 600, 'https://example.com/images/fashion_week.jpg', 2, FALSE),
('Car Show', 'Luxury and classic car exhibition.', 'Tokyo, Japan', '2024-07-15 09:00:00', '2024-07-16 18:00:00', 3000, 'https://example.com/images/car_show.jpg', 2, FALSE);`;

export default {table,dropTable,createTable,seeders};
